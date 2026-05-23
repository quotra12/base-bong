import {
  CANONICAL_SITE_URL,
  getAppImageUrl,
  getAppSplashUrl,
} from "@/config/appAssets";

export const FARCASTER_APP_NAME = "Base Bong GM";

export function getSiteUrl() {
  return CANONICAL_SITE_URL;
}

export function buildFcMiniAppEmbed(siteUrl: string = CANONICAL_SITE_URL) {
  const origin = siteUrl.replace(/\/$/, "");

  return {
    version: "1",
    imageUrl: getAppImageUrl(CANONICAL_SITE_URL),
    button: {
      title: "Tap GM",
      action: {
        type: "launch_miniapp",
        name: FARCASTER_APP_NAME,
        url: origin,
        splashImageUrl: getAppSplashUrl(CANONICAL_SITE_URL),
        splashBackgroundColor: "#09090b",
      },
    },
  };
}
