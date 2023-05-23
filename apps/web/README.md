<p align="center">
    <a href="https://github.com/HarrisFauntleroy/alchemical-finance/releases">
        <img alt="GitHub release" src="https://img.shields.io/github/package-json/v/HarrisFauntleroy/nextjs-starter?&style=for-the-badge">
    </a>
    <a href="/LICENSE">
        <img alt="GitHub" src="https://img.shields.io/github/license/HarrisFauntleroy/alchemical-finance?&style=for-the-badge">
    </a>
    <a href="https://github.com/HarrisFauntleroy/alchemical-finance/graphs/contributors">
        <img alt="GitHub contributors" src="https://img.shields.io/github/contributors-anon/HarrisFauntleroy/alchemical-finance?&style=for-the-badge">
    </a>
    <a href="https://github.com/HarrisFauntleroy/alchemical-finance/actions">
        <img alt="GitHub branch checks state" src="https://img.shields.io/github/checks-status/HarrisFauntleroy/alchemical-finance/main?&style=for-the-badge">
    </a>
    <a href="https://github.com/HarrisFauntleroy/alchemical-finance/issues?q=is%3Aopen+is%3Aissue">
        <img alt="GitHub issues" src="https://img.shields.io/github/issues/HarrisFauntleroy/alchemical-finance?&style=for-the-badge">
    </a>
		    <a href="https://github.com/HarrisFauntleroy/alchemical-finance/issues?q=is%3Aopen+is%3Aissue">
        <img alt="GitHub issues" src="https://img.shields.io/github/last-commit/HarrisFauntleroy/alchemical-finance?&style=for-the-badge">
    </a>
        </a>
		    <a href="https://github.com/HarrisFauntleroy/alchemical-finance/issues?q=is%3Aopen+is%3Aissue">
        <img alt="GitHub issues" src="https://img.shields.io/github/commit-activity/w/HarrisFauntleroy/alchemical-finance?&style=for-the-badge">
    </a>
</p>

<!-- [![unit-test](https://github.com/HarrisFauntleroy/alchemical-finance/actions/workflows/unit.yaml/badge.svg)](https://github.com/HarrisFauntleroy/alchemical-finance/actions/workflows/unit.yaml)

[![e2e-test](https://github.com/HarrisFauntleroy/alchemical-finance/actions/workflows/e2e.yml/badge.svg)](https://github.com/HarrisFauntleroy/alchemical-finance/actions/workflows/e2e.yml) -->

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

## Files of note

<table>
  <thead>
    <tr>
      <th>Path</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="./prisma/schema.prisma"><code>./prisma/schema.prisma</code></a></td>
      <td>Prisma schema</td>
    </tr>
    <tr>
      <td><a href="./src/pages/api/trpc/[trpc].ts"><code>./src/pages/api/trpc/[trpc].ts</code></a></td>
      <td>tRPC response handler</td>
    </tr>
    <tr>
      <td><a href="./src/server/routers"><code>./src/server/routers</code></a></td>
      <td>All tRPC-routers</td>
    </tr>
  </tbody>
</table>

<!-- DISCLAIMER -->

## Disclaimer 🚨

This software is currently a work in progress and is considered in ALPHA state.
Features will appear and disappear, APIs will be changed, bugs will be
introduced, your feedback is always welcome! 🚧

<br />

<p align="center">
	<a href="https://sonarcloud.io/summary/new_code?id=HarrisFauntleroy_alchemical-finance">
	    <img alt="Coverage" src="https://sonarcloud.io/api/project_badges/measure?project=HarrisFauntleroy_alchemical-finance&metric=coverage">
	</a>
	<a href="https://sonarcloud.io/summary/new_code?id=HarrisFauntleroy_alchemical-finance">
	    <img alt="Quality gate" src="https://sonarcloud.io/api/project_badges/measure?project=HarrisFauntleroy_alchemical-finance&metric=alert_status">
	</a>
	<a href="https://sonarcloud.io/summary/new_code?id=HarrisFauntleroy_alchemical-finance">
	    <img alt="Security rating" src="https://sonarcloud.io/api/project_badges/measure?project=HarrisFauntleroy_alchemical-finance&metric=security_rating">
	</a>
	<a href="https://sonarcloud.io/summary/new_code?id=HarrisFauntleroy_alchemical-finance">
	    <img alt="Maintainability" src="https://sonarcloud.io/api/project_badges/measure?project=HarrisFauntleroy_alchemical-finance&metric=sqale_rating">
	</a>
	<a href="https://sonarcloud.io/summary/new_code?id=HarrisFauntleroy_flower-shop ">
	    <img alt="Bugs" src="https://sonarcloud.io/api/project_badges/measure?project=HarrisFauntleroy_flower-shop&metric=bugs">
	</a>
	<a href="https://sonarcloud.io/summary/new_code?id=HarrisFauntleroy_flower-shop">
	    <img alt="Vulnerabilities" src="https://sonarcloud.io/api/project_badges/measure?project=HarrisFauntleroy_alchemical-finance&metric=vulnerabilities">
	</a>
	<a href="https://sonarcloud.io/summary/new_code?id=HarrisFauntleroy_alchemical-finance">
	    <img alt="Code smells" src="https://sonarcloud.io/api/project_badges/measure?project=HarrisFauntleroy_alchemical-finance&metric=code_smells">
	</a>
</p>

<br />

<div align="center">
    <img src="https://forthebadge.com/images/badges/built-with-love.svg" />
</div>
