# Builder
FROM node:20-alpine AS builder

WORKDIR /app

# 依存関係ファイルをコピー
COPY package.json package-lock.json ./
RUN npm install

# ソースをコピーしてビルド
COPY . .
RUN npm run build

# Runner
FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app/.next ./.next

RUN mkdir -p ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "run", "start"]
    