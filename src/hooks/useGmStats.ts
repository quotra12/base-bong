"use client";

import { useCallback, useMemo } from "react";
import {
  useAccount,
  useReadContracts,
  useWatchContractEvent,
} from "wagmi";

import {
  DEPLOY_CHAIN_ID,
  GM_CONTRACT_ADDRESS,
  gmAbi,
  isContractConfigured,
} from "@/config/contract";

export function useGmStats() {
  const { address } = useAccount();
  const enabled = Boolean(address) && isContractConfigured;

  const contracts = useMemo(() => {
    if (!address) return [];
    return [
      {
        address: GM_CONTRACT_ADDRESS,
        abi: gmAbi,
        functionName: "gmCount" as const,
        args: [address] as const,
        chainId: DEPLOY_CHAIN_ID,
      },
      {
        address: GM_CONTRACT_ADDRESS,
        abi: gmAbi,
        functionName: "points" as const,
        args: [address] as const,
        chainId: DEPLOY_CHAIN_ID,
      },
      {
        address: GM_CONTRACT_ADDRESS,
        abi: gmAbi,
        functionName: "lastGmAt" as const,
        args: [address] as const,
        chainId: DEPLOY_CHAIN_ID,
      },
      {
        address: GM_CONTRACT_ADDRESS,
        abi: gmAbi,
        functionName: "freeGmsRemaining" as const,
        args: [address] as const,
        chainId: DEPLOY_CHAIN_ID,
      },
      {
        address: GM_CONTRACT_ADDRESS,
        abi: gmAbi,
        functionName: "totalGms" as const,
        chainId: DEPLOY_CHAIN_ID,
      },
      {
        address: GM_CONTRACT_ADDRESS,
        abi: gmAbi,
        functionName: "GM_FEE" as const,
        chainId: DEPLOY_CHAIN_ID,
      },
      {
        address: GM_CONTRACT_ADDRESS,
        abi: gmAbi,
        functionName: "MIN_INTERVAL" as const,
        chainId: DEPLOY_CHAIN_ID,
      },
    ];
  }, [address]);

  const { data, refetch } = useReadContracts({
    contracts,
    query: {
      enabled,
      staleTime: 0,
    },
  });

  const refreshStats = useCallback(async () => {
    if (!enabled) return;
    await refetch();
  }, [enabled, refetch]);

  useWatchContractEvent({
    address: GM_CONTRACT_ADDRESS,
    abi: gmAbi,
    eventName: "GM",
    chainId: DEPLOY_CHAIN_ID,
    enabled,
    onLogs(logs) {
      if (!address) return;
      const mine = logs.some(
        (log) =>
          log.args.user?.toLowerCase() === address.toLowerCase(),
      );
      if (mine) void refetch();
    },
  });

  return {
    gmCount: data?.[0]?.result,
    points: data?.[1]?.result,
    lastGmAt: data?.[2]?.result,
    freeRemaining: data?.[3]?.result,
    totalGms: data?.[4]?.result,
    gmFeeOnChain: data?.[5]?.result,
    minInterval: data?.[6]?.result,
    refreshStats,
  };
}
