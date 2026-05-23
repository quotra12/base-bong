# Почему в поиске Base «base-bong» с серой иконкой

Это **не ваш логотип** — приложение **ещё не проиндексировано** в каталоге Base.

Признаки:
- Имя **`base-bong`** (домен), а не **Base Bong GM**
- Иконка-сетка 2×2 (дефолт Base)

## Что нужно для индексации

1. **Задеплоить** последний код (на проде должны открываться):
   - https://base-bong.vercel.app/logo-512.png
   - https://base-bong.vercel.app/thumbnail-191.png
   - https://base-bong.vercel.app/manifest.webmanifest
   - https://base-bong.vercel.app/.well-known/farcaster.json — поля `description`, `iconUrl`, `noindex: false`

2. **base.dev** — заполнить Icon, Thumbnail (1.91:1), Name, Description, Category.

3. **Один раз поделиться** ссылкой на приложение **в ленте Base** (пост с URL `https://base-bong.vercel.app`).  
   Индексация в поиске — обычно **~10 минут** после первого share.

4. Обновить манифест в [Farcaster Developer Tools](https://farcaster.xyz/~/developers/mini-apps/manifest) → домен `base-bong.vercel.app` → **Refresh**.

## После индексации

В поиске должно быть:
- **Base Bong GM**
- Логотип «B» (синий)
- Описание из манифеста
