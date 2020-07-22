# Builder Image
# =============
# Download tools, install and compile dependencies.
FROM node:14.5.0-alpine as builder

ENV TCPWAIT_VERSION=2.2.0

WORKDIR /usr/src/app

# * Install glibc and friends to compile bcrypt.
# * Add tcpwait to wait for the database connection.
# * Create modos user & group.
RUN apk --no-cache add \
      ca-certificates \
      g++ \
      make \
      wget \
    && \
    wget -O /usr/local/bin/tcpwait https://github.com/AlphaHydrae/tcpwait/releases/download/v${TCPWAIT_VERSION}/tcpwait_v${TCPWAIT_VERSION}_linux_amd64 && \
    chmod +x /usr/local/bin/tcpwait && \
    addgroup -S modos_backend && \
    adduser -D -G modos_backend -S modos_backend && \
    chown modos_backend:modos_backend /usr/src/app

USER modos_backend:modos_backend

# Install dependencies.
COPY --chown=modos_backend:modos_backend package.json package-lock.json /usr/src/app/
RUN npm ci && \
    npm cache clean --force

# Build the application, then delete development dependencies.
COPY --chown=modos_backend:modos_backend ./ /usr/src/app/
RUN npm run build && \
    npm prune --production

# Production Image
# ================
FROM node:14.5.0-alpine

ENV MODOS_STORAGE_DIRECTORY=/var/lib/modos \
    NODE_ENV=production \
    PORT=3000

WORKDIR /usr/src/app

# * Create modos user.
# * Create storage directory.
RUN addgroup -S modos_backend && \
    adduser -D -G modos_backend -S modos_backend && \
    mkdir -p ${MODOS_STORAGE_DIRECTORY} && \
    chown modos_backend:modos_backend /usr/src/app ${MODOS_STORAGE_DIRECTORY}

USER modos_backend:modos_backend

COPY --chown=modos_backend:modos_backend --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=modos_backend:modos_backend --from=builder /usr/src/app/dist/ /usr/src/app/dist/
COPY --chown=modos_backend:modos_backend openapi.json package.json package-lock.json /usr/src/app/

COPY --from=builder /usr/local/bin/tcpwait /usr/local/bin/tcpwait

EXPOSE 3000

# Wait for the database to be reachable before running the application.
ENTRYPOINT [ \
  "tcpwait", \
  "--interval", "${TCPWAIT_INTERVAL-1000}", \
  "--retries", "${TCPWAIT_ATTEMPTS-59}", \
  "--timeout", "${TCPWAIT_TIMEOUT-1000}", \
  "${MODOS_DATABASE_HOST-db}:${MODOS_DATABASE_PORT-5432}", \
  "--" \
]

CMD [ "node", "dist/index.js" ]
