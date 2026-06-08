FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY --from=builder /app/dist ./dist

COPY data-source.ts .
COPY start.sh .

RUN chmod +x start.sh

EXPOSE 3000

CMD ["./start.sh"]