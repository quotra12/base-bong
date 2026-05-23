/** Canonical production domain — never use preview *.vercel.app URLs in manifests */
export const CANONICAL_SITE_URL = "https://base-bong.vercel.app";

/** Optimized assets (must exist in /public after deploy) */
export const APP_ICON_PATH = "/logo-512.png";
export const APP_SPLASH_PATH = "/logo-splash.png";
export const APP_IMAGE_PATH = "/thumbnail-191.png";
export const APP_HERO_PATH = "/thumbnail-191.png";

export function getSiteOrigin(requestHost?: string | null) {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(/\/$/, "");
  if (production) return `https://${production}`;

  if (requestHost === "base-bong.vercel.app") return CANONICAL_SITE_URL;

  return CANONICAL_SITE_URL;
}

export function appAsset(path: string, origin?: string) {
  const base = (origin ?? getSiteOrigin()).replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function getAppIconUrl(origin?: string) {
  return appAsset(APP_ICON_PATH, origin);
}

export function getAppSplashUrl(origin?: string) {
  return appAsset(APP_SPLASH_PATH, origin);
}

export function getAppImageUrl(origin?: string) {
  return appAsset(APP_IMAGE_PATH, origin);
}

export function getAppHeroUrl(origin?: string) {
  return appAsset(APP_HERO_PATH, origin);
}
