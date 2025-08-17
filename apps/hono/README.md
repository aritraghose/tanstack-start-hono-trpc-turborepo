# Hono Backend

This is the Hono.js primary backend application for the monorepo, running on Cloudflare Workers.

## Getting Started

To start the development server, run:

```bash
pnpm dev
```

The app will be available at [http://localhost:3001](http://localhost:3001).

## Database

The database schema is defined in `src/db/schema`.

-   **Push schema changes to the database:**

    ```bash
    pnpm db:push
    ```

-   **Generate database migrations:**

    ```bash
    pnpm db:generate
    ```

-   **Apply migrations:**

    ```bash
    pnpm db:migrate
    ```

## Deployment

To deploy the application on Cloudflare Workers, run:

```bash
pnpm deploy
```