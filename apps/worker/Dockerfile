# Specify a base image
FROM node:16

# Specify a working directory
WORKDIR /usr/src/worker

# Copy files
COPY . .

# Install dependencies
RUN pnpm install

# Compile typescript
RUN pnpm build

# Copy files
COPY . /usr/src/worker

# Start production server
CMD "pnpm start"