import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";

import { APP_ICON_VERSION } from "@/config/appAssets";
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

/** Talent app domain verification */
export const TALENTAPP_PROJECT_VERIFICATION =
  "83d3d04102f9d68ad02766418200eb8b2e4870367da7d18aadd8a7c97cebf74ee86df62a4846f7ad993630f83c13877dbb455b70ff363b8eddf5ec70cf04e2e8";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: FARCASTER_APP_NAME,
  description:
    "Tap GM on Base. 3 free per day, then paid GMs. Earn points for airdrop.",
  icons: {
    icon: `/icon.png?v=${APP_ICON_VERSION}`,
    apple: `/icon.png?v=${APP_ICON_VERSION}`,
  },
  openGraph: {
    title: FARCASTER_APP_NAME,
    description: "Tap GM onchain on Base. Stack points for airdrop.",
    images: [
      {
        url: `/image.png?v=${APP_ICON_VERSION}`,
        width: 1024,
        height: 1024,
      },
    ],
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
        <link rel="icon" href={`/icon.png?v=${APP_ICON_VERSION}`} />
        <link
          rel="apple-touch-icon"
          href={`/icon.png?v=${APP_ICON_VERSION}`}
        />
        <meta name="base:app_id" content={BASE_APP_ID} />
        <meta
          name="talentapp:project_verification"
          content={TALENTAPP_PROJECT_VERIFICATION}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProvidersShell initialState={initialState}>{children}</ProvidersShell>
      </body>
    </html>
  );
}
