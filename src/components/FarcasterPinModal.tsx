"use client";

import Image from "next/image";

import { useFarcasterAddMiniApp } from "@/hooks/useFarcasterAddMiniApp";

export function FarcasterPinModal() {
  const {
    showPinPrompt,
    isPending,
    status,
    promptAddMiniApp,
    dismissPinPrompt,
    isAdded,
  } = useFarcasterAddMiniApp();

  if (!showPinPrompt || isAdded) return null;

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl border border-violet-500/40 bg-zinc-900 p-6 shadow-2xl shadow-violet-900/30">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/icon.png"
            alt="Base Bong GM"
            width={96}
            height={96}
            className="rounded-2xl"
            priority
          />
          <h2 className="mt-4 text-xl font-bold text-white">Pin Base Bong GM</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Add the app to Warpcast for quick access from your apps list and
            daily GM reminders.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            disabled={isPending}
            onClick={() => void promptAddMiniApp()}
            className="rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 py-3 text-sm font-bold text-white disabled:opacity-50"
          >
            {isPending ? "Opening Warpcast…" : "📌 Pin app"}
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={dismissPinPrompt}
            className="rounded-2xl border border-zinc-700 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-800"
          >
            Later
          </button>
        </div>

        {status ? (
          <p className="mt-3 text-center text-xs text-zinc-500">{status}</p>
        ) : null}
      </div>
    </div>
  );
}
