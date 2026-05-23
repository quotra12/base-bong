import {
  APP_IMAGE_PATH,
  CANONICAL_SITE_URL,
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
    imageUrl: `${CANONICAL_SITE_URL}${APP_IMAGE_PATH}`,
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
