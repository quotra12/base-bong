// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title BaseBongGM — 3 free GMs per day, then paid GMs on Base
contract BaseBongGM {
    uint256 public constant POINTS_PER_FREE_GM = 10;
    uint256 public constant POINTS_PER_PAID_GM = 20;
    uint256 public constant FREE_GM_PER_DAY = 3;
    uint256 public constant GM_FEE = 0.0001 ether;
    uint256 public constant MIN_INTERVAL = 10; // seconds between any GM

    uint256 public totalGms;
    address public owner;
    address public treasury;

    mapping(address => uint256) public lastGmAt;
    mapping(address => uint256) public lastGmDay;
    mapping(address => uint256) public freeGmsUsedToday;
    mapping(address => uint256) public gmCount;
    mapping(address => uint256) public points;

    event GM(
        address indexed user,
        uint256 gmCount,
        uint256 points,
        bool paid,
        uint256 timestamp
    );

    error GmTooSoon(uint256 availableAt);
    error UnexpectedPayment();
    error IncorrectFee(uint256 required);

    constructor() {
        owner = msg.sender;
        treasury = msg.sender;
    }

    function setTreasury(address newTreasury) external {
        require(msg.sender == owner, "not owner");
        require(newTreasury != address(0), "zero treasury");
        treasury = newTreasury;
    }

    function gm() external payable {
        _gm(msg.sender);
    }

    function gmTo(address recipient) external payable {
        require(recipient != address(0) && recipient != msg.sender, "invalid recipient");
        _gm(recipient);
    }

    function freeGmsRemaining(address user) external view returns (uint256) {
        uint256 day = _dayId();
        uint256 used = lastGmDay[user] == day ? freeGmsUsedToday[user] : 0;
        if (used >= FREE_GM_PER_DAY) return 0;
        return FREE_GM_PER_DAY - used;
    }

    function _dayId() internal view returns (uint256) {
        return block.timestamp / 1 days;
    }

    function _gm(address user) internal {
        uint256 day = _dayId();
        if (lastGmDay[user] != day) {
            lastGmDay[user] = day;
            freeGmsUsedToday[user] = 0;
        }

        uint256 last = lastGmAt[user];
        if (last != 0 && block.timestamp < last + MIN_INTERVAL) {
            revert GmTooSoon(last + MIN_INTERVAL);
        }

        bool isFree = freeGmsUsedToday[user] < FREE_GM_PER_DAY;
        if (isFree) {
            if (msg.value != 0) revert UnexpectedPayment();
            freeGmsUsedToday[user] += 1;
        } else {
            if (msg.value != GM_FEE) revert IncorrectFee(GM_FEE);
            (bool sent, ) = treasury.call{value: msg.value}("");
            require(sent, "treasury transfer failed");
        }

        uint256 pointsEarned = isFree ? POINTS_PER_FREE_GM : POINTS_PER_PAID_GM;

        lastGmAt[user] = block.timestamp;
        gmCount[user] += 1;
        points[user] += pointsEarned;
        totalGms += 1;

        emit GM(user, gmCount[user], points[user], !isFree, block.timestamp);
    }
}
