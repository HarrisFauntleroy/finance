FROM node:alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /worker
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=worker --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /worker

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /worker/dist/json/ .
COPY --from=builder /worker/dist/yarn.lock ./yarn.lock
RUN yarn install

# Build the project and its dependencies
COPY --from=builder /worker/dist/full/ .
RUN yarn turbo run build --filter=worker...

FROM node:alpine AS runner
WORKDIR /worker

# Don't run production as root
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY --from=installer /worker .

CMD node apps/worker/dist/index.js