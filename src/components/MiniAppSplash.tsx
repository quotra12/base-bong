"use client";

export function MiniAppSplash() {
  return (
    <div
      className="fixed inset-0 z-[10000] flex min-h-[100dvh] items-center justify-center bg-zinc-950"
      role="presentation"
      aria-hidden
    >
      <div className="text-center">
        <p className="text-4xl font-black text-white">Base Bong</p>
        <p className="mt-2 text-sm text-zinc-400">GM on Base</p>
      </div>
    </div>
  );
}
