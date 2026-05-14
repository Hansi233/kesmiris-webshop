# =============================================================================
# Kesmiris Medusa 2.0 Backend - Multi-Stage Dockerfile (Coolify-ready)
# =============================================================================

# ---- Stage 1: deps ----
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache python3 make g++ libc6-compat
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# ---- Stage 2: build ----
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npx medusa build

# ---- Stage 3: runtime ----
FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache libc6-compat tini && \
    addgroup -S medusa && adduser -S medusa -G medusa

ENV NODE_ENV=production
ENV PORT=9000

COPY --from=builder --chown=medusa:medusa /app/.medusa/server ./
COPY --from=builder --chown=medusa:medusa /app/package.json ./package.json

RUN cd /app && npm install --omit=dev --legacy-peer-deps

USER medusa
EXPOSE 9000

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "index.js"]
