import {
  APP_IMAGE_URL,
  APP_SPLASH_URL,
  getSiteOrigin,
} from "@/config/appAssets";

export const FARCASTER_APP_NAME = "Base Bong GM";

export function getSiteUrl() {
  return getSiteOrigin();
}

export function buildFcMiniAppEmbed(siteUrl: string = getSiteOrigin()) {
  const origin = siteUrl.replace(/\/$/, "");
  const imageUrl =
    siteUrl === getSiteOrigin() ? APP_IMAGE_URL : `${origin}/brand/base-bong-og.png`;
  const splashImageUrl =
    siteUrl === getSiteOrigin()
      ? APP_SPLASH_URL
      : `${origin}/brand/base-bong-splash.png`;

  return {
    version: "1",
    imageUrl,
    button: {
      title: "Tap GM",
      action: {
        type: "launch_miniapp",
        name: FARCASTER_APP_NAME,
        url: origin,
        splashImageUrl,
        splashBackgroundColor: "#09090b",
      },
    },
  };
}
