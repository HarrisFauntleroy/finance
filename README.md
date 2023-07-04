# Alchemical Finance Development Roadmap

⚠️ WORK IN PROGRESS SIDE PROJECT ⚠️

Master your finances with the power of data and simplicity!

[![CI Actions 🚀🤖](https://github.com/HarrisFauntleroy/alchemical-finance/actions/workflows/ci.yml/badge.svg)](https://github.com/HarrisFauntleroy/alchemical-finance/actions/workflows/ci.yml)[![Code Coverage 📊](https://github.com/HarrisFauntleroy/alchemical-finance/actions/workflows/coverage.yml/badge.svg)](https://github.com/HarrisFauntleroy/alchemical-finance/actions/workflows/coverage.yml)![GitHub commit activity](https://img.shields.io/github/commit-activity/w/HarrisFauntleroy/alchemical-finance?style=flat)

## About

Welcome to Alchemical Finance - a personal finance management and tracking
platform. We aim to provide an all-encompassing tool to track, manage and
visualize your financial portfolio.

## Table of Contents

1. [🌟 Development Roadmap](#🌟-development-roadmap)
2. [App Structure](#app-structure)
3. [Local Development](#local-development)
4. [Testing](#testing)
5. [Deployment](#deployment)
6. [Contributing](#contributing)
7. [Security](#security)
8. [License](#license)

## 🌟 Development Roadmap

Our development journey is divided into phases, each focusing on enhancing the
platform's capabilities.

### Phase 1: Core Features (Underway 🚧)

The foundation of the website, including:

- [ ] 🧑‍💻 User account creation and management
- [ ] 📝 Manual input account tracking
- [ ] 🛡️ Robust security features
- [ ] ✅ 100% test coverage suite

### Phase 2: Bank Integration

Introduction of bank APIs to automate transaction and balance tracking. Starting
with the Up Bank API.

- [ ] 🏦 Up Bank API integration
- [ ] 🔄 Automated transaction and balance tracking

### Phase 3: Cryptocurrency Integration

Starting with a select few.

- [ ] 💱 Crypto wallet integration
- [ ] 🔄 Crypto transaction and balance tracking

### Phase 4: Budgeting Tools

Development of budget management features.

- [ ] 💰 Budget creation and management
- [ ] 📊 Expense tracking against budget
- [ ] 📈 Budget visualization (graphs, pie-charts, etc.)

### Phase 5: Market Analysis

Incorporation of market analysis features.

- [ ] 📈 Market data feeds integration
- [ ] 🧠 Market analysis tool development (trends, forecasts, etc.)
- [ ] 📊 User-friendly market data visualization

## App Structure

Our codebase consists of apps and packages written in
[TypeScript](https://www.typescriptlang.org/).

- `apps/web` - a [Next.js](https://nextjs.org) app
  ([README](apps/web/README.md))
- `apps/worker` - a Node.js, BullMQ & Redis based worker
  ([README](apps/worker/README.md))

- `packages/common` - Shared code ([README](packages/common/README.md))
- `packages/ui` - Component Library ([README](packages/ui/README.md))
- `packages/database` - [Prisma](https://prisma.io/) ORM wrapper
  ([README](packages/database/README.md)) [

## Local Development

Interested in contributing? Here's how you can set up Alchemical Finance in your
local dev environment:

### Requirements

- Node >= 14
- Docker 🐳 (for running Postgres)

Node is managed using Node Version Manager

<a href="https://github.com/nvm-sh/logos"><img alt="nvm project logo" src="https://raw.githubusercontent.com/nvm-sh/logos/HEAD/nvm-logo-color.svg" height="50" /></a>

```sh
# Update node version
nvm use <version>
```

## Installation

**Yarn**

```sh
# Install dependencies
yarn
```

### Commands

```sh
# Start all services
yarn dev
```

<!-- LICENSE -->

## **License** ⚖️

Distributed under the MIT License. See `LICENSE` for more information.

---

<!-- DISCLAIMER -->

## **Disclaimer** 🚨

This software is currently a work in progress and is considered in ALPHA state.
Features will appear and disappear, APIs will be changed, bugs will be
introduced, your feedback is always welcome! 🚧
