# base-bong 1245678

Tap **GM** on **Base Mainnet** — each GM earns **10 points** onchain.

- **3 free GMs per day** (UTC day)
- **4th GM and later:** **0.0001 ETH** per tap → **20 points**
- Free GM: **10 points** · anti-spam **10 sec** between taps
- Points → future **airdrop** snapshot

Inspired by [gm.ink](https://www.gm.ink/) (daily GM on Ink); we use **Base** with free + paid GM.

## Stack

- Next.js 16 + Tailwind
- wagmi + viem + [@base-org/account](https://docs.base.org/apps/quickstart/build-app)
- Solidity `BaseBongGM` (Foundry)

## Local dev

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy contract (Base Mainnet)

```bash
forge build
forge create contracts/src/BaseBongGM.sol:BaseBongGM \
  --rpc-url https://mainnet.base.org \
  --private-key YOUR_DEPLOYER_KEY
```

Copy the deployed address into `src/config/contract.ts` → `GM_CONTRACT_ADDRESS`.

You need **ETH on Base** for deploy gas + user paid GMs.

## How it works (vs gm.ink)

| gm.ink | base-bong |
|--------|-----------|
| 1 free GM / 24h | **3 free GM / day** (UTC) |
| Paid GM+ tier | **4+ GM = 0.0001 ETH** each |
| Ink L2 | **Base Mainnet** |

## Push to GitHub

```bash
git add .
git commit -m "update"
git push https://quotra12:YOUR_TOKEN@github.com/quotra12/base-bong.git main
```
