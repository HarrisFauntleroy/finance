# Alchemical Finance Monorepo

[![Build Status](https://travis-ci.org/elixir-money/monorepo.svg?branch=master)](https://travis-ci.org/elixir-money/monorepo)
[![Coverage Status](https://coveralls.io/repos/github/elixir-money/monorepo/badge.svg)](https://coveralls.io/github/elixir-money/monorepo)

## Stack

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Prisma](https://prisma.io/) for database ORM
- [Docker Compose](https://docs.docker.com/compose/) for local database

## Apps

| Folder   | Description                            | README                          |
| -------- | -------------------------------------- | ------------------------------- |
| `web`    | a [Next.js](https://nextjs.org) app    | [README](apps/app/README.md)    |
| `worker` | A Node.js, BullMQ & Redis based worker | [README](apps/worker/README.md) |

## Packages

| Folder     | Description                                                                          | README                                |
| ---------- | ------------------------------------------------------------------------------------ | ------------------------------------- |
| `common`   | Shared code                                                                          | [README](packages/common/README.md)   |
| `config`   | `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`) | [README](packages/config/README.md)   |
| `tsconfig` | `tsconfig.json`s used throughout the monorepo                                        | [README](packages/tsconfig/README.md) |
| `database` | [Prisma](https://prisma.io/) ORM wrapper to manage & access your database            | [README](packages/database/README.md) |

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Useful Commands

### Build

To build all apps and packages, run the following command:

```bash
cd my-turborepo
yarn run build
```

### Develop

To develop all apps and packages, run the following command:

```bash
cd my-turborepo
yarn run dev
```

### Docker Compose 🐳

```sh
# TODO
```

### Database

We use [Prisma](https://prisma.io/) to manage & access our database. As such you will need a database for this project, either locally or hosted in the cloud.

To make this process easier, we offer a [`docker-compose.yml`](https://docs.docker.com/compose/) file to deploy a MySQL server locally with a new database named `turborepo` (To change this update the `MYSQL_DATABASE` environment variable in the `docker-compose.yml` file):

```bash
cd my-turborepo
docker-compose up -d
```

Once deployed you will need to copy the `.env.example` file to `.env` in order for Prisma to have a `DATABASE_URL` environment variable to access.

```bash
cp .env.example .env
```

If you added a custom database name, or use a cloud based database, you will need to update the `DATABASE_URL` in your `.env` accordingly.

Once deployed & up & running, you will need to create & deploy migrations to your database to add the necessary tables. This can be done using [Prisma Migrate](https://www.prisma.io/migrate):

```bash
npx prisma migrate dev
```

If you need to push any existing migrations to the database, you can use either the Prisma db push or the Prisma migrate deploy command(s):

```bash
yarn run db:push

# OR

yarn run db:migrate:deploy
```

There is slight difference between the two commands & [Prisma offers a breakdown on which command is best to use](https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push#choosing-db-push-or-prisma-migrate).

An optional additional step is to seed some initial or fake data to your database using [Prisma's seeding functionality](https://www.prisma.io/docs/guides/database/seed-database).

To do this update check the seed script located in `packages/database/src/seed.ts` & add or update any users you wish to seed to the database.

Once edited run the following command to run tell Prisma to run the seed script defined in the Prisma configuration:

```bash
yarn run db:seed
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/features/pipelines)
- [Caching](https://turborepo.org/docs/features/caching)
- [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/features/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)

## License ⚖️

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more information.
