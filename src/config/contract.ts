import { base } from "wagmi/chains";

/** Set after deploy: forge create contracts/src/BaseBongGM.sol:BaseBongGM --rpc-url https://mainnet.base.org */
export const GM_CONTRACT_ADDRESS =
  "0x862a5C4200cED19279951e7074b14da1B6Fc2bCD" as const;

export const DEPLOY_CHAIN_ID = base.id;

export const POINTS_PER_FREE_GM = 10;
export const POINTS_PER_PAID_GM = 20;
export const FREE_GM_PER_DAY = 3;
/** Must match contract GM_FEE (0.0001 ETH) */
export const GM_FEE_WEI = BigInt("100000000000000");

export const gmAbi = [
  {
    type: "function",
    name: "gm",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "gmCount",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "points",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "lastGmAt",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "freeGmsRemaining",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalGms",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "FREE_GM_PER_DAY",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "GM_FEE",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "POINTS_PER_FREE_GM",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "POINTS_PER_PAID_GM",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MIN_INTERVAL",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "GM",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "gmCount", type: "uint256", indexed: false },
      { name: "points", type: "uint256", indexed: false },
      { name: "paid", type: "bool", indexed: false },
      { name: "timestamp", type: "uint256", indexed: false },
    ],
  },
] as const;

export const isContractConfigured =
  GM_CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000";
