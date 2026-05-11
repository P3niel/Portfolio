FROM node:22-alpine AS builder

WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ .
RUN npm run build

# ── Runtime ───────────────────────────────────────────────────────────────────
FROM node:22-alpine

RUN addgroup -g 1001 appgroup \
 && adduser -u 1001 -G appgroup -s /bin/sh -D appuser

WORKDIR /app

COPY --from=builder --chown=appuser:appgroup /app/.next/standalone ./
COPY --from=builder --chown=appuser:appgroup /app/.next/static ./.next/static
COPY --from=builder --chown=appuser:appgroup /app/public ./public

USER appuser

EXPOSE 3000
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
