# Alchemical Finance Monorepo

Alchemical Finance is a TypeScript-based monorepo that aims to provide a comprehensive financial solution using modern web technologies. It consists of multiple applications and packages working together to deliver a seamless user experience.

## Table of Contents

- [Apps](#apps)
- [Packages](#packages)
- [Local Development](#local-development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

## Apps

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

To get started with local development, follow these steps:

### Prerequisites

- [Docker](https://www.docker.com/)
- [Yarn](https://yarnpkg.com/)

### Steps

1. **Clone the repository and install dependencies:**

   ```bash
   git clone https://github.com/elixir-money/monorepo.git
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

## Testing

Describe how to test the app here.

## Deployment

Describe how to deploy the app here

## Contributing

We welcome contributions to the Alchemical Finance project! If you would like to contribute, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new feature branch from the `main` branch.
3. Make your changes and ensure that the code follows the project's coding style and standards.
4. Submit a pull request with a clear description of your changes.
5. Address any feedback from maintainers and adjust your pull request accordingly.

For bug reports, feature requests, and other issues, please use the GitHub issue tracker to submit them.

## Security

If you discover a security vulnerability in the Alchemical Finance project, please email us at [security@example.com](mailto:) instead of using the issue tracker. We will address the issue as soon as possible and appreciate your discretion in keeping our users safe.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more information.
