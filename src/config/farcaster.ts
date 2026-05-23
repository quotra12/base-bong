export const FARCASTER_APP_NAME = "Base Bong GM";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://base-bong.vercel.app";

export function getSiteUrl() {
  return SITE;
}

export function buildFcMiniAppEmbed(siteUrl: string = SITE) {
  const origin = siteUrl.replace(/\/$/, "");
  return {
    version: "1",
    imageUrl: `${origin}/image.png`,
    button: {
      title: "Tap GM",
      action: {
        type: "launch_miniapp",
        name: FARCASTER_APP_NAME,
        url: origin,
        splashImageUrl: `${origin}/splash.png`,
        splashBackgroundColor: "#09090b",
      },
    },
  };
}
