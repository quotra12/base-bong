/** New path = new CDN cache key (Base ignores ?v= query on icon.png) */
export const APP_ICON_PATH = "/brand/base-bong-icon.png";
export const APP_SPLASH_PATH = "/brand/base-bong-splash.png";
export const APP_IMAGE_PATH = "/brand/base-bong-og.png";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://base-bong.vercel.app";

export function getSiteOrigin() {
  return SITE;
}

export function appAsset(path: string) {
  const base = SITE.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export const APP_ICON_URL = appAsset(APP_ICON_PATH);
export const APP_SPLASH_URL = appAsset(APP_SPLASH_PATH);
export const APP_IMAGE_URL = appAsset(APP_IMAGE_PATH);
