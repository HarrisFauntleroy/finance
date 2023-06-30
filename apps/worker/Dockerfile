# Specify a base image
FROM node:20-alpine AS builder

# Specify a working directory
WORKDIR /usr/src/worker

RUN yarn global add turbo

# Copy only package.json and yarn.lock to optimize dependency installation
COPY package.json yarn.lock ./

# Prune and build the application
RUN turbo prune --scope=worker --docker

# Install dependencies
RUN yarn install 

# Copy the source code
COPY . .

# Build the project
RUN yarn turbo run build --filter=worker

# Runner stage
FROM node:20-alpine

# Specify a working directory
WORKDIR /usr/src/worker

# Don't run production as root
RUN addgroup --system --gid 1001 appuser && \
	adduser --system --uid 1001 --ingroup appuser appuser && \
	chown -R appuser:appuser /usr/src/worker

# Set user
USER appuser

# Copy files from builder stage
COPY --from=builder /usr/src/worker/package.json /usr/src/worker/yarn.lock ./
COPY --from=builder /usr/src/worker/node_modules ./node_modules
COPY --from=builder /usr/src/worker/dist ./dist

# Start production server
CMD ["yarn", "start"]
