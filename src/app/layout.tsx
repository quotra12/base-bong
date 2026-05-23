import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";

import {
  APP_ICON_PATH,
  APP_IMAGE_PATH,
  CANONICAL_SITE_URL,
} from "@/config/appAssets";
import { buildFcMiniAppEmbed, FARCASTER_APP_NAME } from "@/config/farcaster";
import { getConfig } from "@/config/wagmi";
import { ProvidersShell } from "./providers-loader";
import "./globals.css";

const siteUrl = CANONICAL_SITE_URL;

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
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/logo-192.png", sizes: "192x192", type: "image/png" },
      { url: "/logo-512.png", sizes: "512x512", type: "image/png" },
      { url: APP_ICON_PATH, sizes: "1024x1024", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: FARCASTER_APP_NAME,
    description: "Tap GM onchain on Base. Stack points for airdrop.",
    images: [{ url: APP_IMAGE_PATH, width: 1200, height: 628 }],
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
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/logo-192.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/logo-512.png" sizes="512x512" type="image/png" />
        <link rel="icon" href={APP_ICON_PATH} sizes="1024x1024" type="image/png" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
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
