# Farcaster compatibility — Base Bong GM

## Manifest

Live at: https://base-bong.vercel.app/.well-known/farcaster.json

Icons: `icon.png` 1024×1024, `splash.png` 200×200 (same logo as Farcaster).
Manifest includes both `miniapp` and `frame` keys for Base App + Warpcast.

Domain verified via `accountAssociation` (FID 772593).

## Wallet in Farcaster / Warpcast

| Environment | Wallet |
|-------------|--------|
| Inside Warpcast mini app | **Embedded Farcaster wallet** (`farcasterMiniApp` connector → `sdk.wallet.ethProvider`) |
| Browser / Base App | Base Account, MetaMask (`injected`) |

Auto-connect runs when `sdk.isInMiniApp()` is true.

## What works

- GM transactions on Base Mainnet
- Points (10 free / 20 paid)
- Farcaster user context (`@username`, FID)
- `sdk.actions.ready()` splash
- Cast embed meta (`fc:miniapp` in layout)

## Base App note

Base App also supports standard web apps via [Base.dev](https://www.base.dev). Farcaster manifest is for **Warpcast discovery**; both can coexist.

## Verify manifest

https://farcaster.xyz/~/developers/mini-apps/manifest

Enter: `base-bong.vercel.app`
