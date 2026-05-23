/** Bump when replacing icon/splash so clients refresh cached artwork */
export const APP_ICON_VERSION = "2";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://base-bong.vercel.app";

export function getSiteOrigin() {
  return SITE;
}

export function appAsset(path: string) {
  const base = SITE.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}?v=${APP_ICON_VERSION}`;
}

export const APP_ICON_URL = appAsset("/icon.png");
export const APP_SPLASH_URL = appAsset("/splash.png");
export const APP_IMAGE_URL = appAsset("/image.png");
