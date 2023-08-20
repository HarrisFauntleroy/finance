# Alchemical Finance Website

<div align="center">
    <a href="">
        <img src="https://github.com/HarrisFauntleroy/alchemical-finance/blob/main/public/images/logo.png?raw=true" alt="" height="140" />
    </a>
    <h5 align="center">
        Alchemical Finance
    </h5>
    <p align="center">
        <a target="_blank" href="">💵</a>
          &middot;
        <a target="_blank" href="">💷</a>
          &middot;
        <a target="_blank" href="">💴</a>
          &middot;
        <a target="_blank" href="">💶</a>
    </p>
</div>

## **About**

A personal finance application

## **Features**

See [Disclaimer](#disclaimer-🚨)

Accounts

<ul>
  <li>Assets and Liabilities tracking</li>
  <li>Cryptocurrency support</li>
</ul>

Budgets

<ul>
  <li>Envelope style budget system</li>
</ul>

General

<ul>
  <li>Multi-currency support</li>
</ul>

## **Development**

- ⚡ Full-stack React with Next.js
- ⏱ Postgres Database with Prisma + backups
- 🚀 Fast deploy with docker compose 🐳
- 🧙‍♂️ End to end type-safety with [tRPC](https://trpc.io)
- 🔐 Validate environment variables at build time
- 💡 VS Code Suggested extensions
- 🗺️ Sitemap.xml and robots.txt with next-sitemap
- 🤖 SEO metadata, JSON-LD and Open Graph tags with Next SEO
- 🗂 VSCode configuration: Debug, Settings, Tasks and extension for PostCSS,
  ESLint, Prettier, TypeScript, Jest
- 🎉 Storybook for UI development
- 🦺 Unit Testing with Jest and React Testing Library 🧪 E2E Testing with
  Cypress 👷 Run tests on pull request with GitHub Actions
- 💖 Continuous integration with GitHub actions
- 🧪 End-to-end testing with [Playwright](https://playwright.dev/)
- 🎨 [ESLint](https://eslint.org) + Prettier 💅
- 🐶 Git hooks with [Husky](https://www.npmjs.com/package/husky)
<!-- - 📜 Automatic API documentation [(Swagger)](https://swagger.io/solutions/api-documentation/) -->
- 🔍 Clean Code Analysis with [SonarCloud](https://sonarcloud.io)

## Setup

yarn:

```sh
# Install dependencies
yarn

# Copy .env file and fill in values
cp .env.template > .env

# Deploy database to Docker
# Run pending migrations
# Seeds database 🌱
yarn setup

# Start development server
yarn dev
```

### Requirements

- Node >= 14
- Docker (for running Postgres, Redis, etc.) 🐳

### NVM

<a href="https://github.com/nvm-sh/logos"><img alt="nvm project logo" src="https://raw.githubusercontent.com/nvm-sh/logos/HEAD/nvm-logo-color.svg" height="50" /></a>

Node is managed using Node Version Manager

```sh
# Update node version
nvm use <version>
```

## Development

### Database backups handled by

https://github.com/prodrigestivill/docker-postgres-backup-local

### Commands

```sh
# Run the build scripts (including pre/post build) 🔨
yarn build

# Update Swagger.json
# yarn swagger

# Resets database on Docker
yarn reset-db

# runs e2e tests on dev
yarn test-dev

# runs e2e tests on `next start` - requires `yarn build` before use
yarn test-start

# runs normal jest unit tests
yarn test:unit

# runs e2e tests
yarn test:e2e

# Runs Prettier on all files
yarn format

# Runs `next lint`
yarn lint

# Runs ESLint with the --fix flag
# Runs `yarn format`
yarn lint:fix

# Generate prisma schema
yarn prisma

# Format schema.prisma
yarn prisma format

# Launch prisma studio
yarn prisma studio

# Deploy containers to a remote host using docker context
docker context create <context-label> --docker "host=ssh://<username>@<address>"

# Select context to use
docker context use <context-label>

# Prune all stopped containers
docker system prune -a
```

<!-- DISCLAIMER -->

## Disclaimer 🚨

This software is currently a work in progress and is considered in ALPHA state.
Features will appear and disappear, APIs will be changed, bugs will be
introduced, your feedback is always welcome! 🚧
