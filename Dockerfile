# syntax=docker/dockerfile:1
FROM node:24-alpine AS base

# Install dependencies only when needed. Copy every workspace package.json (not
# just the root) so npm can resolve the workspace graph before the source lands.
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/ui/package.json ./packages/ui/
RUN --mount=type=cache,target=/root/.npm npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Build only the web app via turbo. Next `standalone` + outputFileTracingRoot
# (repo root) emits the monorepo layout under apps/web/.next/standalone.
RUN --mount=type=cache,target=/app/apps/web/.next/cache npx turbo run build --filter=web

# Production image, copy only what's needed
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# standalone bundles the hoisted node_modules + apps/web/server.js; static and
# public are copied alongside at the paths server.js expects (relative to it).
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/web/server.js"]
