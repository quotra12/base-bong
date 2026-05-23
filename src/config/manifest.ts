import {
  APP_ICON_URL,
  APP_IMAGE_URL,
  APP_SPLASH_URL,
  getSiteOrigin,
} from "@/config/appAssets";

export const FARCASTER_ACCOUNT_ASSOCIATION = {
  header:
    "eyJmaWQiOjc3MjU5MywidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweEQ4QUQ1NDdDMDEwNEU0ZDBGQTk4ZDQwYTQwZjMyM2M2ZDIyMTkzRDYifQ",
  payload: "eyJkb21haW4iOiJiYXNlLWJvbmcudmVyY2VsLmFwcCJ9",
  signature:
    "aNKxg7IXaSpxXReRuoKnm61D2oW2dNb5B7T8aSBNVTwkcsuxjZHNnQWkMciljtQZuEha1zYhOfAw2820d/6MhBs=",
} as const;

const MINIAPP_METADATA = {
  version: "1",
  name: "Base Bong GM",
  iconUrl: APP_ICON_URL,
  homeUrl: getSiteOrigin(),
  imageUrl: APP_IMAGE_URL,
  buttonTitle: "Tap GM",
  splashImageUrl: APP_SPLASH_URL,
  splashBackgroundColor: "#09090b",
  webhookUrl: `${getSiteOrigin()}/api/webhook`,
} as const;

export function buildFarcasterManifest() {
  return {
    accountAssociation: FARCASTER_ACCOUNT_ASSOCIATION,
    miniapp: MINIAPP_METADATA,
    frame: MINIAPP_METADATA,
  };
}
