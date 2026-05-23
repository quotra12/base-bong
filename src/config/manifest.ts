import {
  CANONICAL_SITE_URL,
  getAppIconUrl,
  getAppImageUrl,
  getAppSplashUrl,
} from "@/config/appAssets";

export const FARCASTER_ACCOUNT_ASSOCIATION = {
  header:
    "eyJmaWQiOjc3MjU5MywidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweEQ4QUQ1NDdDMDEwNEU0ZDBGQTk4ZDQwYTQwZjMyM2M2ZDIyMTkzRDYifQ",
  payload: "eyJkb21haW4iOiJiYXNlLWJvbmcudmVyY2VsLmFwcCJ9",
  signature:
    "aNKxg7IXaSpxXReRuoKnm61D2oW2dNb5B7T8aSBNVTwkcsuxjZHNnQWkMciljtQZuEha1zYhOfAw2820d/6MhBs=",
} as const;

/** Manifest always uses the production domain so Base/Warpcast fetch the same icon URL. */
export function buildFarcasterManifest() {
  const miniapp = {
    version: "1",
    name: "Base Bong GM",
    iconUrl: getAppIconUrl(CANONICAL_SITE_URL),
    homeUrl: CANONICAL_SITE_URL,
    imageUrl: getAppImageUrl(CANONICAL_SITE_URL),
    buttonTitle: "Tap GM",
    splashImageUrl: getAppSplashUrl(CANONICAL_SITE_URL),
    splashBackgroundColor: "#09090b",
    webhookUrl: `${CANONICAL_SITE_URL}/api/webhook`,
  } as const;

  return {
    accountAssociation: FARCASTER_ACCOUNT_ASSOCIATION,
    miniapp,
    frame: miniapp,
  };
}
