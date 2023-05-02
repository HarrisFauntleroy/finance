# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!

# Builder stage
FROM node:16-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies and tools
RUN apk add --no-cache libc6-compat && \
	apk update && \
	yarn global add turbo

# Copy the source files
COPY . .

# Prune and build the application
RUN turbo prune --scope=web --docker

# Installer stage
FROM node:16-alpine AS installer

# Set working directory
WORKDIR /app

# Install dependencies
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN apk add --no-cache libc6-compat && \
	apk update && \
	yarn install

# Copy the build files
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Build the project
RUN yarn turbo run build --filter=web...

# Runner stage
FROM node:16-alpine AS runner

# Set working directory
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs && \
	adduser --system --uid 1001 nextjs && \
	chown -R nextjs:nodejs /app

# Set user
USER nextjs

# Copy necessary files from installer stage
COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .
COPY --from=installer /app/apps/web/.next/standalone ./
COPY --from=installer /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer /app/apps/web/public ./apps/web/public

# Start the application
CMD node apps/web/server.js
