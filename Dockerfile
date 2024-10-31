# 1st attempt - prod
# FROM node:18-alpine AS base

# FROM base AS deps

# RUN apk add --no-cache libc6-compat
# WORKDIR /app

# COPY package.json ./
# COPY .env .env


# RUN npm install --save-dev prisma

# RUN npm update && npm install


# FROM base AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .


# # RUN npx prisma migrate dev
# RUN npx prisma generate

# RUN npm run build

# FROM base AS runner
# WORKDIR /app

# ENV NODE_ENV production
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/public ./public

# RUN mkdir .next
# RUN chown nextjs:nodejs .next

# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs

# EXPOSE 3000

# ENV PORT 3000

# RUN npx prisma migrate dev

# CMD ["node", "server.js"]

# 2nd attempt - prod and dev

# FROM node:18-alpine as base
# RUN apk add --no-cache g++ make py3-pip libc6-compat
# WORKDIR /app
# COPY package*.json ./
# EXPOSE 3000

# FROM base as builder
# WORKDIR /app
# COPY . .
# RUN npm run build


# FROM base as production
# WORKDIR /app

# ENV NODE_ENV=production
# RUN npm ci

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001
# USER nextjs


# COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/public ./public

# CMD npm start

# FROM base as dev
# ENV NODE_ENV=development
# RUN npm install 
# COPY . .
# CMD npm run dev


# 3rd attempt - prod
# FROM node:20-slim AS base

# FROM base AS builder

# WORKDIR /app

# COPY package.json package-lock.json* ./

# RUN npm ci
# COPY . .

# ENV NEXT_TELEMETRY_DISABLED=1
# ENV NODE_ENV=production

# ARG DATABASE_URL
# RUN npx prisma generate

# RUN npm run build

# FROM base AS runner
# WORKDIR /app

# ENV NEXT_TELEMETRY_DISABLED=1
# ENV NODE_ENV=production

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/public ./public

# RUN mkdir .next
# RUN chown nextjs:nodejs .next

# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# # COPY --from=builder --chown=nextjs:nodejs /app/drizzle ./drizzle
# COPY --from=builder --chown=nextjs:nodejs /app/run.sh ./run.sh
# RUN chmod +x ./run.sh

# # RUN cd drizzle/migrate && npm i

# WORKDIR /app

# USER nextjs

# EXPOSE 3000

# ENV PORT=3000

# ARG HOSTNAME

# CMD ["sh", "./run.sh"]



# Install dependencies only when needed
FROM node:18-alpine AS base

FROM base AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml\* ./
COPY prisma ./prisma/
RUN \
 if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
 elif [ -f package-lock.json ]; then npm ci; \
 elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
 else echo "Lockfile not found." && exit 1; \
 fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry

# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npx prisma generate --schema=./prisma/schema.prisma

RUN \
 if [ -f yarn.lock ]; then yarn run build; \
 elif [ -f package-lock.json ]; then npm run build; \
 elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
 else echo "Lockfile not found." && exit 1; \
 fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --chown=nextjs:nodejs prisma ./prisma/

USER nextjs

EXPOSE 3000

ENV PORT 3000

# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["npm", "run", "prod"]
