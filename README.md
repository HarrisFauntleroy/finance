# Alchemical Finance Development Roadmap

## Overview

Welcome to Alchemical Finance - a website designed to help you manage and track
your personal financial portfolio. This document outlines our development plans,
local setup, and contribution guidelines.

## Table of Contents

1. [Roadmap](#roadmap)
2. [App Structure](#app-structure)
3. [Local Development](#local-development)
4. [Testing](#testing)
5. [Deployment](#deployment)
6. [Contributing](#contributing)
7. [Security](#security)
8. [License](#license)

## Roadmap

### Phase 1: Core Features

Focuses on the foundation of the website.

- [ ] User account creation and management
- [ ] Manual input account tracking
- [ ] Robust security features
- [ ] 100% test coverage suite

### Phase 2: Bank Integration

Introduction of bank APIs to automate transaction and balance tracking. Starting
with the Up Bank API.

- [ ] Up Bank API integration
- [ ] Automated transaction and balance tracking

### Phase 3: Cryptocurrency Integration

Starting with a select few.

- [ ] Crypto wallet integration
- [ ] Crypto transaction and balance tracking

### Phase 4: Budgeting Tools

Development of budget management features.

- [ ] Budget creation and management
- [ ] Expense tracking against budget
- [ ] Budget visualization (graphs, pie-charts, etc.)

### Phase 5: Market Analysis

Incorporation of market analysis features.

- [ ] Market data feeds integration
- [ ] Market analysis tool development (trends, forecasts, etc.)
- [ ] User-friendly market data visualization

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

### Prerequisites

- [Docker](https://www.docker.com/)
- [Yarn](https://yarnpkg.com/)

### Steps

1. **Clone the repository and install dependencies:**

   ```bash
   git clone https://github.com/alchemical-finance/monorepo.git
   cd monorepo
   yarn install
   ```

2. **Configure environment:**

   Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

   Update the `DATABASE_URL` in your `.env` file if necessary.

3. **Start Docker Compose:**

   Run the Postgres server using Docker Compose:

   ```bash
   docker-compose up -d
   ```

4. **Initialize the database:**

   Apply migrations using Prisma Migrate:

   ```bash
   yarn prisma migrate dev
   ```

   Optional: Seed the database:

   ```bash
   yarn db:seed
   ```

5. **Build and run the development environment:**

   ```bash
   yarn run build
   yarn run dev
   ```

6. **Migrate Database and Generate Prisma Client**

```bash
yarn turbo db:push db:generate
```

## Testing

(Testing instructions to be added)

## Deployment

(Deployment instructions to be added)

## Contributing

Contributions are always welcome! Please:

1. Fork the repository on GitHub.
2. Create a new feature branch.
3. Adhere to our coding style and standards.
4. Submit a clear, well-described pull request.
5. Address feedback from maintainers. 6.

Submit bug reports, feature requests, and issues via the GitHub issue tracker.

## Security

For security vulnerabilities, please email us at security@example.com rather
than using the issue tracker.

## License

MIT License. See [LICENSE](LICENSE) for more details.
