FROM node:18-alpine AS base

FROM base AS deps

ARG PNPM_VERSION=8.15.1

RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

# Copy the package.json and pnpm-lock.yaml and folder ckeditor to the working directory.
COPY package.json pnpm-lock.yaml ./
COPY ckeditor ./ckeditor

RUN pnpm install --frozen-lockfile


FROM base AS builder
WORKDIR /app

RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

COPY --from=deps /app/node_modules ./node_modules
COPY . .


ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET

ENV NODE_ENV production
ENV DATABASE_URL postgres://folkmoz:190545fM@talktrek.postgres.database.azure.com:5432/talktrek?sslmode=require
ENV NEXTAUTH_SECRET abfc4bebb4df0d84923b9b0738ba2d43f2b4de78379301d0116c9ef940879b72ae4de8ed665155ce68a871065813244354046991206b425f8da918398ba8db9a
ENV NEXTAUTH_URL https://talktrek.azurewebsites.net
ENV GOOGLE_CLIENT_ID $GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET $GOOGLE_CLIENT_SECRET

ENV BACKEND_URL https://talktrek.azure-api.net
ENV NEXT_PUBLIC_WS_URL wss://talktrek.azure-api.net/ws

ENV NEXT_PUBLIC_BACKEND_URL https://talktrek.azure-api.net
ENV NEXT_PUBLIC_CLOUDINARY_URL https://api.cloudinary.com/v1_1/folk-images/image/upload
ENV NEXT_PUBLIC_CLOUDINARY_UPLOAD_COVER_PRESET Cover-Image
ENV NEXT_PUBLIC_CLOUDINARY_UPLOAD_BODY_PRESET Body-Post-Image

ENV CLOUDINARY_API_KEY 977597826368652
ENV CLOUDINARY_API_SECRET z7lcS7ittcE8EaQVp91GiOaRusM

RUN pnpm run build


FROM base AS runner
WORKDIR /app

ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET

ENV NODE_ENV production
ENV DATABASE_URL postgres://folkmoz:190545fM@talktrek.postgres.database.azure.com:5432/talktrek?sslmode=require
ENV NEXTAUTH_SECRET abfc4bebb4df0d84923b9b0738ba2d43f2b4de78379301d0116c9ef940879b72ae4de8ed665155ce68a871065813244354046991206b425f8da918398ba8db9a
ENV NEXTAUTH_URL https://talktrek.azurewebsites.net
ENV GOOGLE_CLIENT_ID $GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET $GOOGLE_CLIENT_SECRET

ENV BACKEND_URL https://talktrek.azure-api.net
ENV NEXT_PUBLIC_WS_URL wss://talktrek.azure-api.net/ws

ENV NEXT_PUBLIC_BACKEND_URL https://talktrek.azure-api.net
ENV NEXT_PUBLIC_CLOUDINARY_URL https://api.cloudinary.com/v1_1/folk-images/image/upload
ENV NEXT_PUBLIC_CLOUDINARY_UPLOAD_COVER_PRESET Cover-Image
ENV NEXT_PUBLIC_CLOUDINARY_UPLOAD_BODY_PRESET Body-Post-Image

ENV CLOUDINARY_API_KEY 977597826368652
ENV CLOUDINARY_API_SECRET z7lcS7ittcE8EaQVp91GiOaRusM

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]