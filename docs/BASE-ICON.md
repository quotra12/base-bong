# Иконка в Base App (важно)

## Почему в Warpcast логотип есть, а в Base — нет

После **9 апреля 2026** Base App берёт иконку **из настроек проекта на base.dev**, а не только из `farcaster.json`.

Манифест на сайте уже правильный, но Base может **игнорировать** его и показывать иконку, загруженную (или закэшированную) в дашборде.

## URL логотипа (вставьте на base.dev)

```
https://base-bong.vercel.app/logo.png
```

Splash (200×200):

```
https://base-bong.vercel.app/logo-splash.png
```

## Шаги на base.dev (обязательно)

1. https://base.dev → проект **Base Bong GM**
2. **App settings** / **Metadata**
3. Поле **Icon** — вставьте URL `https://base-bong.vercel.app/logo.png`  
   (если есть только загрузка файла — загрузите `public/logo.png` и **Save**)
4. **Primary URL** = `https://base-bong.vercel.app`
5. Сохраните и откройте https://base.dev/preview → Refresh

## Vercel

В **Settings → Environment Variables** (Production):

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://base-bong.vercel.app` |

Без этого в HTML попадали preview-URL (`base-bong-xxxxx.vercel.app`) и Base мог не подтянуть картинки.

## В приложении Base

1. Удалите мини-приложение из списка
2. Откройте снова с https://base-bong.vercel.app
3. Сделайте **пост/шаринг** ссылки в Base (индексация ~10 мин)

## Проверка

- https://base-bong.vercel.app/logo.png — синий логотип «B»
- https://base-bong.vercel.app/.well-known/farcaster.json — `iconUrl` должен указывать на `/logo.png`
