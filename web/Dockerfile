FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json tsconfig*.json vite.config.* ./
RUN npm install   # <-- changed from npm ci

COPY . .
ARG VITE_APIGET_AVAY
ARG VITE_ALLOWED_HOST
ENV VITE_APIGET_AVAY=${VITE_APIGET_AVAY}
ENV VITE_ALLOWED_HOST=${VITE_ALLOWED_HOST}

RUN npm run build

FROM node:20-alpine AS server
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
