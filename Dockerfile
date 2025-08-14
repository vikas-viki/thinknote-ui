FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm
RUN pnpm install

COPY . .

RUN pnpm build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./

RUN npm i -g serve

CMD ["serve", "-s", ".", "-l", "5173"]