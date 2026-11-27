# Contributing to mockmama

Thanks for helping. This repo is **static mock JSON** for prototypes, plus an optional **NestJS API** that serves those files over HTTP.

By participating, you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).

## How to contribute

1. Open an [issue](https://github.com/poluru-labs/mockmama/issues/new/choose) before a large new dataset.
2. Fork the repo and create a branch from `main`.
3. Edit or add JSON under `mock/` (and `server/` only when changing the API).
4. Run validation locally (required before push — see below).
5. Open a pull request using the PR template.

## Dataset rules

### JSON shape

- **Most domain files** use one keyed array: `{ "products": [ ... ] }`.
- **Workspace / screen files** may use a single object (for example `{ "settings": { ... } }` or `{ "workspace": { ... } }`).
- **Enterprise dashboard** folders may use screen-shaped objects (tables, KPIs, navigation), not only arrays.
- Keep existing record `id` values unless the issue is specifically to replace them.
- Cross-links must resolve: a `productId` in a cart must exist in `products.json`.
- Use fake data only (`@example.com`, example phone numbers, last4 card digits). No real personal data.
- Prefer [picsum.photos](https://picsum.photos) seeds for images.
- Include a few edge states (empty, pending, cancelled, expired) when they help a UI.

### AI workspace folders

For `mock/ai-*` and similar workspace mocks:

- Include `manifest.json` with `version`, `description`, and a `files[]` list; every listed `path` must exist.
- Prefer shared shell files where applicable: `workspace.json`, `users.json`, `navigation.json`, `settings.json`, `dashboard-overview.json`, `activity.json`, `notifications.json`.
- Collection files should use stable string `id` fields so the HTTP API can address items by id.

## HTTP mock API (`server/`)

The NestJS app maps each dataset under `mock/` to versioned routes:

| Method | Path | Behavior |
|--------|------|----------|
| `GET` | `/health` | Liveness and `mockRoot` |
| `GET` | `/api/v1` | List datasets |
| `GET` | `/api/v1/{dataset}` | List resources (json basenames) in that dataset |
| `GET` | `/api/v1/{dataset}/{resource}` | Full collection, document, or array payload |
| `GET` | `/api/v1/{dataset}/{resource}/{id}` | Single item when the file holds a collection with `id` |
| `POST` | `/api/v1/{dataset}/{resource}` | Append item (requires `id` in body); **in-memory** only |
| `PUT` | `/api/v1/{dataset}/{resource}/{id}` | Replace item; in-memory |
| `PATCH` | `/api/v1/{dataset}/{resource}/{id}` | Merge item; in-memory |
| `DELETE` | `/api/v1/{dataset}/{resource}/{id}` | Remove item; in-memory |
| `DELETE` | `/api/v1/{dataset}/{resource}` | Reset resource overlay back to on-disk JSON |

Nested datasets use slash paths, for example `/api/v1/admin/ecommerce/products`.

**Examples**

```http
GET /api/v1/ai-course-creator/activity
GET /api/v1/ai-course-creator/activity/act_001
POST /api/v1/ai-course-creator/activity
```

Writes do not modify committed JSON on disk; they apply to an in-memory overlay until the process restarts or you `DELETE` the resource to reset.

### Local API setup

```sh
npm run api:install    # once: installs server dependencies
npm run api:dev        # watch mode on http://localhost:3000
```

Optional env (see `server/.env.example`): `PORT`, `MOCK_ROOT`.

## Validation (required before push)

From the repository root:

```sh
npm install            # installs husky + runs validate hooks setup
npm run api:install    # first time / when server package.json changes
npm run validate
```

`npm run validate` runs:

1. `scripts/validate-mocks.mjs` — parse all `mock/**/*.json` and check AI `manifest.json` file references.
2. `server` ESLint, TypeScript build, and e2e tests against the API.

A **pre-push** hook runs the same `npm run validate`. CI runs it on every pull request (`.github/workflows/validate.yml`).

JSON-only quick check:

```sh
npm run validate:json
```

## Adding a new domain

Put files in `mock/<domain>/` (for example `mock/jobs/`). Reuse IDs already in this repo when the domains overlap (same people, brands, or companies).

After adding files, they are automatically available at `/api/v1/<domain>/<resource>` once the API is running.

## Pull requests

- One dataset or one focused change per PR when you can.
- Say which files changed and why.
- Do not commit secrets, `.env` files, or `node_modules/`.
- Ensure `npm run validate` passes locally.

## License

Contributions are licensed under the [MIT License](LICENSE).