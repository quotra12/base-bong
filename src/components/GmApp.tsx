"use client";

import { useEffect, useMemo, useState } from "react";
import {
  useAccount,
  useChainId,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { formatEther } from "viem";
import {
  DEPLOY_CHAIN_ID,
  FREE_GM_PER_DAY,
  GM_CONTRACT_ADDRESS,
  GM_FEE_WEI,
  POINTS_PER_FREE_GM,
  POINTS_PER_PAID_GM,
  gmAbi,
  isContractConfigured,
} from "@/config/contract";
import { ConnectWallet } from "@/components/ConnectWallet";

function explorerTxUrl(chainId: number, hash: string) {
  const base =
    chainId === 8453
      ? "https://basescan.org"
      : "https://sepolia.basescan.org";
  return `${base}/tx/${hash}`;
}

export function GmApp() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const queryClient = useQueryClient();
  const [now, setNow] = useState(() => Math.floor(Date.now() / 1000));

  const { data: gmCount } = useReadContract({
    address: GM_CONTRACT_ADDRESS,
    abi: gmAbi,
    chainId: DEPLOY_CHAIN_ID,
    functionName: "gmCount",
    args: address ? [address] : undefined,
    query: { enabled: !!address && isContractConfigured },
  });

  const { data: points } = useReadContract({
    address: GM_CONTRACT_ADDRESS,
    abi: gmAbi,
    chainId: DEPLOY_CHAIN_ID,
    functionName: "points",
    args: address ? [address] : undefined,
    query: { enabled: !!address && isContractConfigured },
  });

  const { data: lastGmAt } = useReadContract({
    address: GM_CONTRACT_ADDRESS,
    abi: gmAbi,
    chainId: DEPLOY_CHAIN_ID,
    functionName: "lastGmAt",
    args: address ? [address] : undefined,
    query: { enabled: !!address && isContractConfigured },
  });

  const { data: freeRemaining } = useReadContract({
    address: GM_CONTRACT_ADDRESS,
    abi: gmAbi,
    chainId: DEPLOY_CHAIN_ID,
    functionName: "freeGmsRemaining",
    args: address ? [address] : undefined,
    query: { enabled: !!address && isContractConfigured },
  });

  const { data: gmFeeOnChain } = useReadContract({
    address: GM_CONTRACT_ADDRESS,
    abi: gmAbi,
    chainId: DEPLOY_CHAIN_ID,
    functionName: "GM_FEE",
    query: { enabled: isContractConfigured },
  });

  const { data: minInterval } = useReadContract({
    address: GM_CONTRACT_ADDRESS,
    abi: gmAbi,
    chainId: DEPLOY_CHAIN_ID,
    functionName: "MIN_INTERVAL",
    query: { enabled: isContractConfigured },
  });

  const { data: totalGms } = useReadContract({
    address: GM_CONTRACT_ADDRESS,
    abi: gmAbi,
    chainId: DEPLOY_CHAIN_ID,
    functionName: "totalGms",
    query: { enabled: isContractConfigured },
  });

  const { data: hash, isPending, writeContract, error: writeError } =
    useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    const t = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!isSuccess || !address) return;
    void queryClient.invalidateQueries({ queryKey: ["readContract"] });
  }, [isSuccess, address, queryClient]);

  const feeWei = gmFeeOnChain ?? GM_FEE_WEI;
  const feeLabel = formatEther(feeWei);

  const freeLeft = Number(freeRemaining ?? FREE_GM_PER_DAY);
  const isPaidGm = freeLeft === 0;

  const cooldownEnds = useMemo(() => {
    if (!lastGmAt || !minInterval) return 0;
    const last = Number(lastGmAt);
    if (last === 0) return 0;
    return last + Number(minInterval);
  }, [lastGmAt, minInterval]);

  const secondsLeft = Math.max(0, cooldownEnds - now);
  const canGm = secondsLeft === 0;

  const wrongChain = isConnected && chainId !== DEPLOY_CHAIN_ID;

  const handleGm = () => {
    writeContract({
      address: GM_CONTRACT_ADDRESS,
      abi: gmAbi,
      functionName: "gm",
      chainId: DEPLOY_CHAIN_ID,
      value: isPaidGm ? feeWei : BigInt(0),
    });
  };

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-8">
      <header className="text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-blue-400">
          Base Mainnet · Farcaster
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-white">
          Base Bong GM
        </h1>
        <p className="mt-3 text-sm text-zinc-400">
          {FREE_GM_PER_DAY} free GMs/day ({POINTS_PER_FREE_GM} pts), then{" "}
          {feeLabel} ETH ({POINTS_PER_PAID_GM} pts) → future{" "}
          <span className="text-amber-300">airdrop</span>.
        </p>
      </header>

      <div className="w-full rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-center text-sm text-amber-100">
        🎁 Stack points — airdrop snapshot from onchain GM score
      </div>

      {!isContractConfigured && (
        <div className="w-full rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          Deploy <code className="text-xs">BaseBongGM</code> on Base and set{" "}
          <code className="text-xs">GM_CONTRACT_ADDRESS</code> in{" "}
          <code className="text-xs">src/config/contract.ts</code>
        </div>
      )}

      <ConnectWallet />

      {isConnected && (
        <div className="grid w-full grid-cols-2 gap-3">
          <StatCard label="Your GMs" value={gmCount?.toString() ?? "0"} />
          <StatCard
            label="Your points"
            value={points?.toString() ?? "0"}
            highlight
          />
          <StatCard
            label="Free GMs today"
            value={`${freeLeft} / ${FREE_GM_PER_DAY}`}
            className="col-span-2"
          />
          <StatCard
            label="Global GMs"
            value={totalGms?.toString() ?? "—"}
            className="col-span-2"
          />
        </div>
      )}

      {wrongChain && (
        <button
          type="button"
          onClick={() => switchChain({ chainId: DEPLOY_CHAIN_ID })}
          disabled={isSwitching}
          className="w-full rounded-2xl bg-blue-600 py-4 font-bold text-white hover:bg-blue-500"
        >
          {isSwitching ? "Switching…" : "Switch to Base"}
        </button>
      )}

      {isConnected && !wrongChain && isContractConfigured && (
        <>
          <button
            type="button"
            onClick={handleGm}
            disabled={!canGm || isPending || isConfirming}
            className={`gm-pulse w-full rounded-3xl py-8 text-2xl font-black text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-40 ${
              isPaidGm
                ? "bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/30"
                : "bg-gradient-to-br from-blue-500 to-violet-600 shadow-blue-500/30"
            }`}
          >
            {isPending
              ? "Confirm in wallet…"
              : isConfirming
                ? "Onchain…"
                : !canGm
                  ? `Wait ${secondsLeft}s`
                  : isPaidGm
                    ? `GM · ${feeLabel} ETH`
                    : "GM ☀️ Free"}
          </button>

          <p className="text-center text-xs text-zinc-500">
            {isPaidGm
              ? `Paid GM: ${feeLabel} ETH · +${POINTS_PER_PAID_GM} points`
              : `Free GM: +${POINTS_PER_FREE_GM} pts · ${freeLeft} left today (UTC)`}
          </p>

          {writeError && (
            <p className="text-center text-sm text-red-400">
              {writeError.message.split("\n")[0]}
            </p>
          )}

          {isSuccess && hash && (
            <a
              href={explorerTxUrl(DEPLOY_CHAIN_ID, hash)}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-400 hover:underline"
            >
              View on Basescan →
            </a>
          )}
        </>
      )}

      <footer className="text-center text-xs text-zinc-600">
        Inspired by{" "}
        <a
          href="https://www.gm.ink/"
          className="text-zinc-400 hover:text-white"
          target="_blank"
          rel="noreferrer"
        >
          gm.ink
        </a>{" "}
        · Base Mainnet
      </footer>
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight,
  className = "",
}: {
  label: string;
  value: string;
  highlight?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-4 ${className}`}
    >
      <p className="text-xs text-zinc-500">{label}</p>
      <p
        className={`mt-1 text-2xl font-bold ${highlight ? "text-amber-300" : "text-white"}`}
      >
        {value}
      </p>
    </div>
  );
}
