"use client";

import { useState } from "react";
import {
  useAccount,
  useConnect,
  useConnectors,
  useDisconnect,
} from "wagmi";

import { useFarcasterMiniApp } from "@/hooks/useFarcasterMiniApp";

const WALLET_USER_DISCONNECTED_KEY = "basebong_wallet_disconnected";

export function ConnectWallet() {
  const { address, isConnected, isConnecting, isReconnecting, connector } =
    useAccount();
  const { connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const connectors = useConnectors();
  const { inMiniApp, user } = useFarcasterMiniApp();
  const [showPicker, setShowPicker] = useState(false);

  const farcasterConnector = connectors.find((c) => c.id === "farcaster");
  const extensionConnectors = connectors.filter(
    (c) => c.id !== "farcaster",
  );

  const handleDisconnect = (opts?: { openPicker?: boolean }) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(WALLET_USER_DISCONNECTED_KEY, "1");
    }
    disconnect();
    setShowPicker(opts?.openPicker ?? false);
  };

  const handleConnect = (connectorId: string) => {
    const target = connectors.find((c) => c.id === connectorId);
    if (!target) return;
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(WALLET_USER_DISCONNECTED_KEY);
    }
    connect({ connector: target });
    setShowPicker(false);
  };

  if (isReconnecting) {
    return <p className="text-sm text-zinc-400">Reconnecting wallet…</p>;
  }

  if (isConnected && !showPicker) {
    return (
      <div className="flex w-full max-w-xs flex-col items-center gap-2">
        {user?.username && inMiniApp && (
          <p className="text-sm text-violet-300">@{user.username}</p>
        )}
        <div className="flex w-full items-center justify-between gap-2 rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3">
          <div className="min-w-0">
            <p className="text-xs text-zinc-500">{connector?.name ?? "Wallet"}</p>
            <p className="truncate font-mono text-sm text-zinc-100">
              {address?.slice(0, 6)}…{address?.slice(-4)}
            </p>
          </div>
        </div>
        <div className="flex w-full gap-2">
          <button
            type="button"
            onClick={() => handleDisconnect()}
            className="flex-1 rounded-xl border border-zinc-600 py-2.5 text-sm font-medium text-zinc-200 hover:bg-zinc-800"
          >
            Disconnect
          </button>
          <button
            type="button"
            onClick={() => handleDisconnect({ openPicker: true })}
            className="flex-1 rounded-xl bg-zinc-100 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-white"
          >
            Change wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <p className="text-center text-xs text-zinc-500">
        {showPicker ? "Choose wallet" : "Connect wallet to send GM"}
      </p>

      {inMiniApp && farcasterConnector && (
        <button
          type="button"
          onClick={() => handleConnect("farcaster")}
          disabled={isConnecting || isPending}
          className="rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-500 disabled:opacity-50"
        >
          Farcaster wallet (Warpcast)
        </button>
      )}

      {extensionConnectors.map((c) => (
        <button
          key={c.uid}
          type="button"
          onClick={() => handleConnect(c.id)}
          disabled={isConnecting || isPending}
          className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 disabled:opacity-50"
        >
          {c.name}
          {c.id === "injected" ? " (browser extension)" : ""}
        </button>
      ))}

      {showPicker && isConnected && (
        <button
          type="button"
          onClick={() => setShowPicker(false)}
          className="text-center text-xs text-zinc-500 hover:text-zinc-300"
        >
          Cancel
        </button>
      )}
    </div>
  );
}
