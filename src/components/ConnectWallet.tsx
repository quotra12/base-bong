"use client";

import { useEffect } from "react";
import { useAccount, useConnect, useConnectors, useDisconnect } from "wagmi";

import { useFarcasterMiniApp } from "@/hooks/useFarcasterMiniApp";

export function ConnectWallet() {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();
  const { connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const connectors = useConnectors();
  const { inMiniApp, isSdkReady, user } = useFarcasterMiniApp();

  const farcasterConnector = connectors.find((c) => c.id === "farcaster");
  const otherConnectors = connectors.filter((c) => c.id !== "farcaster");

  useEffect(() => {
    if (!inMiniApp || !isSdkReady || isConnected || !farcasterConnector) return;
    connect({ connector: farcasterConnector });
  }, [inMiniApp, isSdkReady, isConnected, farcasterConnector, connect]);

  if (isReconnecting) {
    return <p className="text-sm text-zinc-400">Reconnecting wallet…</p>;
  }

  if (!isConnected) {
    return (
      <div className="flex w-full max-w-xs flex-col gap-2">
        {inMiniApp && (
          <p className="text-center text-xs text-violet-300">
            Warpcast wallet will connect automatically
          </p>
        )}
        {farcasterConnector && !inMiniApp && (
          <button
            type="button"
            onClick={() => connect({ connector: farcasterConnector })}
            disabled={isConnecting || isPending}
            className="rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-500 disabled:opacity-50"
          >
            Connect Farcaster
          </button>
        )}
        {otherConnectors.map((connector) => (
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
    <div className="flex flex-col items-center gap-2">
      {user?.username && (
        <p className="text-sm text-violet-300">@{user.username} on Farcaster</p>
      )}
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
    </div>
  );
}
