# Иконка в Base App

Farcaster и Base App кэшируют иконку **по URL**. Старый путь `/icon.png` мог остаться в кэше Base навсегда.

## URL логотипа (после деплоя)

- Иконка: https://base-bong.vercel.app/brand/base-bong-icon.png
- Splash: https://base-bong.vercel.app/brand/base-bong-splash.png

Манифест: https://base-bong.vercel.app/.well-known/farcaster.json

## Обязательно на base.dev

Base App **часто берёт иконку из настроек проекта**, а не только из манифеста:

1. Откройте https://base.dev → ваш проект **Base Bong GM**
2. **App settings** → **Icon**
3. Загрузите файл `public/brand/base-bong-icon.png` (1024×1024 PNG)
4. Сохраните

## Проверка

1. https://base.dev/preview — введите `base-bong.vercel.app`, Refresh
2. В Base App: удалите мини-приложение из списка и откройте снова
3. Поделитесь ссылкой на приложение в Base (индексация ~10 мин)
