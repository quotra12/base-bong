# Деплой через Remix → Base Mainnet

## 1. Открыть Remix

https://remix.ethereum.org

## 2. Создать файл контракта

1. Слева **File Explorer** → папка `contracts`
2. **Create new file** → имя: `BaseBongGM.sol`
3. Скопировать весь код из `remix/BaseBongGM.sol` в этом проекте

## 3. Скомпилировать

1. Иконка **Solidity Compiler** (слева)
2. Compiler: **0.8.24** (или 0.8.20+)
3. EVM: **default** / **cancun**
4. **Compile BaseBongGM.sol**
5. Зелёная галочка ✓

## 4. Кошелёк + сеть Base

1. Установить **MetaMask** или **Rabby**
2. Добавить сеть **Base Mainnet**:
   - Chain ID: `8453`
   - RPC: `https://mainnet.base.org`
   - Explorer: `https://basescan.org`
   - Symbol: ETH
3. Перевести **ETH на Base** (bridge: https://bridge.base.org)

## 5. Подключить Remix к кошельку

1. Иконка **Deploy & Run** (слева)
2. **Environment:** `Injected Provider - MetaMask` (или Rabby)
3. В кошельке выбрать сеть **Base**
4. **Account** — ваш адрес с ETH

## 6. Задеплоить

1. **Contract:** `BaseBongGM - contracts/BaseBongGM.sol`
2. **Deploy** (оранжевая кнопка)
3. Подтвердить транзакцию в кошельке
4. Внизу в **Deployed Contracts** появится адрес — **скопировать**

## 7. Вставить адрес в приложение

Файл: `src/config/contract.ts`

```ts
export const GM_CONTRACT_ADDRESS = "0xВАШ_АДРЕС" as const;
```

## 8. Проверка на Basescan

https://basescan.org/address/ВАШ_АДРЕС

## 9. (Опционально) Verify в Remix

Deploy tab → **Verify** на BaseScan (нужен API key Basescan)

---

**Treasury** = адрес, с которого деплоили (туда идут 0.0001 ETH за платные GM).
