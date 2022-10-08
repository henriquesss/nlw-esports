### Typescript init
npm i express
npm i typescript
npx tsc --init
tsconfig.json --linha 29 (./src)
tsconfig.json --linha 30 (descomentar)
tsconfig.json --linha 52 (./build)

## Entidades
### Game
id
title
bannerUrl

### Ad
id
gameId
name
yearsPlaying
discord
weekDays
hourStart
hourEnd
useVoiceChannel
createdAt

## Casos de uso
- Listagem de games com contagem de anúncios
- Criação de novo anúncio
- Listagem de anúncios por game
- Buscar Discord pelo id do anúncio