"use client";

import Image from "next/image";

export function MiniAppSplash() {
  return (
    <div
      className="fixed inset-0 z-[10000] flex min-h-[100dvh] items-center justify-center bg-zinc-950"
      role="presentation"
      aria-hidden
    >
      <Image
        src="/icon.png"
        alt="Base Bong GM"
        width={160}
        height={160}
        className="rounded-3xl"
        priority
      />
    </div>
  );
}
