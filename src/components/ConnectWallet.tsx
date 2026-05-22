"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

export function ConnectWallet() {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isReconnecting) {
    return (
      <p className="text-sm text-zinc-400">Reconnecting wallet…</p>
    );
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col gap-2 w-full max-w-xs">
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            type="button"
            onClick={() => connect({ connector })}
            disabled={isConnecting || isPending}
            className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 disabled:opacity-50"
          >
            Connect {connector.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-full border border-zinc-700 bg-zinc-900/80 px-4 py-2">
      <span className="font-mono text-sm text-zinc-200">
        {address?.slice(0, 6)}…{address?.slice(-4)}
      </span>
      <button
        type="button"
        onClick={() => disconnect()}
        className="text-xs text-zinc-400 hover:text-white"
      >
        Disconnect
      </button>
    </div>
  );
}
