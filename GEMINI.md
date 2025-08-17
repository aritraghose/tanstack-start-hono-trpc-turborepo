# GEMINI.md

## Project Overview

This is a monorepo for a full-stack application, built with [Turborepo](https://turbo.build/repo) and [pnpm](https://pnpm.io/). It includes:

*   `apps/web`: A [Next.js](https://nextjs.org/) frontend application with [React](https://reactjs.org/) and [shadcn/ui](https://ui.shadcn.com/).
*   `apps/hono`: A [Hono.js](https://hono.dev/) backend application running on Cloudflare Workers.
*   `apps/tanstack`: A [TanStack](https://tanstack.com/) application with [React Query](https://tanstack.com/query/latest) and [React Router](https://tanstack.com/router/latest).
*   `packages/ui`: A shared UI component library using [shadcn/ui](https://ui.shadcn.com/).
*   `packages/eslint-config`: Shared ESLint configuration.
*   `packages/typescript-config`: Shared TypeScript configuration.

The project is set up for type-safe database access with [Drizzle ORM](https://orm.drizzle.team/) and a PostgreSQL database.

## Building and Running

### Prerequisites

*   [Node.js](https://nodejs.org/) (v20 or higher)
*   [pnpm](https://pnpm.io/) (v10.4.1 or higher)

### Installation

```bash
pnpm install
```

### Development

To start the development servers for all apps, run the following command from the root of the project:

```bash
pnpm dev
```

*   The Tanstack app will be available at [http://localhost:3000](http://localhost:3000).
*   The Hono app will be available at [http://localhost:3001](http://localhost:3001).
*   The Next.js app will be available at [http://localhost:3002](http://localhost:3002).

### Build

To build all the apps and packages in the monorepo, run the following command from the root of the project:

```bash
pnpm build
```

## Development Conventions

### Code Style

This project uses [Prettier](https://prettier.io/) for code formatting and [ESLint](https://eslint.org/) for linting. You can format the code by running:

```bash
pnpm format
```

And lint the code by running:

```bash
pnpm lint
```

### UI Components

UI components are located in `packages/ui/src/components`. To add new components, use the `shadcn-ui` CLI from the `apps/web` directory:

```bash
pnpm dlx shadcn-ui@latest add <component-name> -c apps/web
```

This will add the component to the `packages/ui` package, making it available to all apps in the monorepo.

### Database

The database schema is defined in `apps/hono/src/db/schema`. To push schema changes to the database, run:

```bash
pnpm --filter hono db:push
```

To generate database migrations, run:

```bash
pnpm --filter hono db:generate
```

To apply migrations, run:

```bash
pnpm --filter hono db:migrate
```
