# Mockmama API

NestJS service that exposes everything under `mock/` as a versioned REST API.

## Quick start

```sh
cd server
npm install
npm run start:dev
```

From repo root: `npm run api:dev` (after `npm run api:install`).

Default URL: `http://localhost:3000`

## Route conventions

- **Dataset** = folder under `mock/` (may include slashes, e.g. `admin/ecommerce`).
- **Resource** = JSON basename without `.json` (e.g. `activity` → `activity.json`).
- Responses wrap payloads in `{ data, meta }` for lists and items.

See [CONTRIBUTING.md](../CONTRIBUTING.md) for the full method table and contribution rules.

## Project layout

```
src/
  catalog/     # GET /api/v1 — dataset index
  config/      # MOCK_ROOT, PORT
  health/      # GET /health
  mock/        # CRUD controller + file store
  common/      # API error filter, shared types
test/
  mock-api.e2e-spec.ts
```

## Tests

```sh
npm run test:e2e
```

## Environment

| Variable | Default |
|----------|---------|
| `PORT` | `3000` |
| `MOCK_ROOT` | `../mock` (relative to server cwd) |