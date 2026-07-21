# frontend/Dockerfile
# ---------------------------------------------------------
# 這是「開發階段」用的 Dockerfile：目的是讓你在容器裡跑
# `npm run dev`，搭配 docker-compose.yml 的 volume 掛載，
# 改前端程式碼就能即時反映，不用重新 build image。
#
# 注意：這個檔案假設 ./frontend 資料夾底下已經有
# package.json（也就是你先在本機跑過
# `npx create-next-app@latest .` 之後才會有）。
# 之後要正式上線時，建議再另外寫一份 multi-stage 的
# production Dockerfile（用 next build + next start，
# 產物更小、更安全），現在開發階段先用這份就好。
# ---------------------------------------------------------

FROM node:20-slim

WORKDIR /app

# 先只複製 package.json 和 lockfile，善用 Docker 分層快取，
# 依賴沒變的話，重新 build 不用重新 npm install。
COPY package*.json ./

RUN npm install

# 複製其餘程式碼（開發階段一樣會被 volume 掛載蓋過去，
# 但保留這行讓沒有掛載的情境下 image 依然完整可用）。
COPY . .

EXPOSE 3000

# Next.js dev server 預設只監聽 localhost，
# 加上 -H 0.0.0.0 才能讓容器外部(你的瀏覽器)連得進來。
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
