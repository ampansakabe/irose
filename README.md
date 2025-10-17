# Multitenant starter structure

This repository provides a lightweight scaffold for a multitenant web application using a PostgreSQL database. It is organized into three packages: a Node.js/Express API server, a React client, and SQL assets for provisioning PostgreSQL schemas.

## Server (`server/`)

The server is an Express application written in TypeScript.

- `src/config` – runtime configuration loading (environment variables such as `DATABASE_URL` and tenant header configuration).
- `src/db` – shared PostgreSQL connection pool setup.
- `src/middleware` – middleware to resolve the tenant context from headers or subdomains and attach a tenant-scoped PostgreSQL client for each request.
- `src/services` – logic for tenant lifecycle, including schema creation, validation, and listing.
- `src/controllers` and `src/routes` – REST endpoints for working with tenants.
- `src/types` – Express type augmentation for tenant-specific request properties.

Each request receives a dedicated PostgreSQL client with its `search_path` set to the active tenant schema while retaining access to shared tables in `public`.

### Running the server

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

The server exposes:

- `GET /health` – health check.
- `GET /api/tenants` – list existing tenant schemas.
- `GET /api/tenants/current` – returns the active tenant derived from headers/subdomain and confirms the connected schema.

## Client (`client/`)

The client is a Vite + React TypeScript application with a simple UI for switching tenants and requesting tenant context data from the API.

- `src/api` – typed fetch helpers for tenant endpoints.
- `src/hooks` – React hooks for tenant state management and data fetching.
- `src/components` – UI components for tenant switching and display.

### Running the client

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

If your environment cannot download optional dev dependencies (for example,
`@vitejs/plugin-react`), the Vite configuration falls back to a built-in JSX
transform so the client can still start. You will lose React Fast Refresh, but
the development server and application remain fully functional.

The Vite development server proxies API requests to the Express server on `http://localhost:4000`.

## Database (`db/`)

The `db` directory contains SQL migration templates to set up shared tables, helper functions, and tenant-specific schemas.

### Getting started with PostgreSQL

1. Create a database (e.g. `createdb irose`).
2. Apply the bootstrap SQL in `db/migrations/000_init.sql`.
3. Optionally set the `DATABASE_URL` in `server/.env` to point at your database. If this is
   omitted the server will fall back to `postgres://postgres:postgres@localhost:5432/irose`.

Once the services are running you can experiment by creating schemas manually:

```sql
SELECT public.create_tenant('tenant_a');
SELECT public.create_tenant('tenant_b');
```

Requests with the header `x-tenant-id: tenant_a` will now operate within the `tenant_a` schema.

## Viewing the latest code changes

If you're reviewing the repository inside a terminal and want to inspect the
changes introduced by the most recent commit, you can ask Git to display the
diff directly in the window:

```bash
git show HEAD
```

To compare your local working tree with the current commit (for example, after
you make edits), run:

```bash
git status
git diff
```

These commands will show modified files and highlight line-by-line
differences so you can confirm exactly what was added or removed.
