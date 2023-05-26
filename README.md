# Alchemical Finance Monorepo

Welcome to Alchemical Finance - a TypeScript-based monorepo designed to deliver comprehensive financial solutions leveraging cutting-edge web technologies. Our monorepo consists of several intertwined applications and packages, all working in unison to offer a smooth and seamless user experience.

## Table of Contents

- [Applications](#applications)
- [Packages](#packages)
- [Local Development](#local-development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

## Applications

Alchemical Finance includes the following apps:

| Folder   | Description                            | README                          |
| -------- | -------------------------------------- | ------------------------------- |
| `web`    | a [Next.js](https://nextjs.org) app    | [README](apps/web/README.md)    |
| `worker` | A Node.js, BullMQ & Redis based worker | [README](apps/worker/README.md) |

## Packages

Alchemical Finance includes the following packages:

| Folder     | Description                                                               | README                                |
| ---------- | ------------------------------------------------------------------------- | ------------------------------------- |
| `common`   | Shared code                                                               | [README](packages/common/README.md)   |
| `ul`       | Component Library                                                         | [README](packages/ul/README.md)       |
| `database` | [Prisma](https://prisma.io/) ORM wrapper to manage & access your database | [README](packages/database/README.md) |

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Local Development

Embarking on local development is easy. Just follow these steps:

### Prerequisites

Ensure you have [Docker](https://www.docker.com/) and [Yarn](https://yarnpkg.com/) installed.

### Steps

1. **Clone the repository and install dependencies:**

   ```bash
   git clone https://github.com/alchemical-finance/monorepo.git
   cd monorepo
   yarn install
   ```

2. **Set up your environment:**

   Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

   Update the `DATABASE_URL` in your `.env` file if necessary.

3. **Launch Docker Compose:**

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

5. **Build and start the development environment:**

   ```bash
   yarn dev
   ```

## Testing

To learn how to test the application, please refer to our [testing guide]().

## Deployment

For a detailed guide on deploying the application, please see our [deployment instructions]().

## Contributing

We warmly welcome contributions to the Alchemical Finance project! To contribute, follow these guidelines:

1. Fork the repository on GitHub.
2. Initiate a new feature branch from the main branch.
3. Implement your changes, adhering to the project's code style and standards.
4. Submit a pull request with a comprehensive summary of your changes.
5. Address any feedback from the maintainers and revise your pull request as necessary.
6. For submitting bug reports, requesting features, or reporting other issues, please use the GitHub issue tracker to submit them.

## Security

If you discover a security vulnerability in the Alchemical Finance project,
please email us at [security@example.com](mailto:) instead of using the issue
tracker. We will address the issue as soon as possible and appreciate your
discretion in keeping our users safe.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more
information.
