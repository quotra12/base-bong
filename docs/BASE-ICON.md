# Иконка в Base App (важно)

## Почему в Warpcast логотип есть, а в Base — нет

После **9 апреля 2026** Base App берёт иконку **из настроек проекта на base.dev**, а не только из `farcaster.json`.

Манифест на сайте уже правильный, но Base может **игнорировать** его и показывать иконку, загруженную (или закэшированную) в дашборде.

## PWA manifest (для иконки на домашнем экране Base)

Добавлен `manifest.webmanifest` с иконками **192 / 512 / 1024** px.  
Серый квадрат «base-b…» = Base не нашёл PWA-иконку и подставил имя домена.

## App Thumbnail на base.dev (1.91:1)

На base.dev поле **Upload App Thumbnail** требует соотношение **1.91:1** (не квадрат).

Файл в проекте:

```
public/thumbnail-191.png   →   1200×628 px
```

**Загрузите этот файл** кнопкой Upload (или после деплоя URL):

```
https://base-bong.vercel.app/thumbnail-191.png
```

Квадратный `logo.png` сюда **не подходит** — будет ошибка «must be in 1.91:1 aspect ratio».

## Icon (квадрат) на base.dev

```
https://base-bong.vercel.app/logo-512.png
```

(или `logo.png` 1024×1024)

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

## В приложении Base (обязательно)

Старую закладку **нельзя обновить** — иконка кэшируется при первом добавлении.

1. **Удалите** приложение с домашнего экрана / из «Your Apps» (долгое нажатие → Remove)
2. Задеплойте сайт с новым `manifest.webmanifest`
3. Откройте https://base-bong.vercel.app в Base и **добавьте заново**
4. Сделайте **пост/шаринг** ссылки в Base (индексация ~10 мин)

## Проверка

- https://base-bong.vercel.app/logo.png — синий логотип «B»
- https://base-bong.vercel.app/.well-known/farcaster.json — `iconUrl` должен указывать на `/logo.png`
