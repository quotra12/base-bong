import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";

import { buildFcMiniAppEmbed, FARCASTER_APP_NAME } from "@/config/farcaster";
import { getConfig } from "@/config/wagmi";
import { ProvidersShell } from "./providers-loader";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  (process.env.VERCEL_URL != null
    ? `https://${process.env.VERCEL_URL}`
    : "https://base-bong.vercel.app");

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fcMiniAppEmbed = JSON.stringify(buildFcMiniAppEmbed(siteUrl));

/** Base.dev domain verification — must be in static <head> HTML */
export const BASE_APP_ID = "6a10edac2f5dad1ef72e65c2";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: FARCASTER_APP_NAME,
  description:
    "Tap GM on Base. 3 free per day, then paid GMs. Earn points for airdrop.",
  openGraph: {
    title: FARCASTER_APP_NAME,
    description: "Tap GM onchain on Base. Stack points for airdrop.",
    images: [{ url: "/image.png", width: 1024, height: 1024 }],
  },
  other: {
    "fc:miniapp": fcMiniAppEmbed,
    "fc:frame": fcMiniAppEmbed,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieHeader = (await headers()).get("cookie") ?? "";
  const initialState = cookieToInitialState(getConfig(), cookieHeader);

  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content={BASE_APP_ID} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProvidersShell initialState={initialState}>{children}</ProvidersShell>
      </body>
    </html>
  );
}
