# mockmama

Static mock JSON for UI prototypes, design-system demos, and fake APIs.

Use this repo when a storefront, dashboard, or sandbox needs realistic records without a backend. Data is fake, internally consistent, and safe to commit: cross-links (product ids, contact ids, job ids) resolve to records that exist.

## Datasets

Everything lives under `mock/`.

| Folder | What it is |
| --- | --- |
| [`mock/ecommerce/`](mock/ecommerce/) | Shopper catalog, carts, orders, reviews, coupons |
| [`mock/admin/ecommerce/`](mock/admin/ecommerce/) | Small admin-shaped catalog, users, and reviews |
| [`mock/auth/`](mock/auth/) | Users, sessions, MFA, roles, OAuth, invitations |
| [`mock/blog/`](mock/blog/) | Articles, authors, comments, tags, newsletters |
| [`mock/crm/`](mock/crm/) | Leads, contacts, companies, deals, tickets |
| [`mock/events/`](mock/events/) | Events, venues, sessions, tickets, waitlist |
| [`mock/finance/`](mock/finance/) | Accounts, bills, budgets, cards, transfers |
| [`mock/jobs/`](mock/jobs/) | Jobs, candidates, applications, interviews |
| [`mock/enterprise-bi-dashboard/`](mock/enterprise-bi-dashboard/) | Analytics workspace screens (KPIs, reports, lineage) |
| [`mock/enterprise-billing-dashboard/`](mock/enterprise-billing-dashboard/) | Invoices, subscriptions, payments, collections |
| [`mock/enterprise-banking-operations/`](mock/enterprise-banking-operations/) | Clearing, payments, screening, liquidity |
| [`mock/enterprise-claims-copilot/`](mock/enterprise-claims-copilot/) | Performance copilot (scorecards, alerts) plus hospitality ops vista |

Most domain files are a single keyed array, for example `{ "products": [ ... ] }`, so they work with `fetch()`, [json-server](https://github.com/typicode/json-server), or a local mock layer. Enterprise dashboard folders are screen-shaped objects (tables, KPIs, navigation) rather than one array per file.

## How to use

Fetch a file as-is:

```js
const res = await fetch("/mock/ecommerce/products.json");
const { products } = await res.json();
```

Or point json-server at one file:

```sh
npx json-server mock/ecommerce/products.json --port 3001
```

Demo passwords in auth and ecommerce users are `demo123` (customers) and `admin123` (admin). Emails use `@example.com`. Product and avatar images are [picsum.photos](https://picsum.photos) seeds, not real merchandise photos.

## E-commerce

`mock/ecommerce/` is a full shopper portal snapshot.

| File | What it holds |
| --- | --- |
| `categories.json` | Nested categories (electronics, fashion, home, sports, beauty, books) |
| `products.json` | Catalog with variants, prices, stock, ratings, and image URLs |
| `brands.json` / `sellers.json` | Brand and marketplace seller records |
| `users.json` | Sample customers plus an admin account |
| `addresses.json` / `payment-methods.json` | Saved shipping and card-on-file data (last4 only) |
| `watchlist.json` | Saved items with price-drop and back-in-stock flags |
| `cart.json` | Active carts with line items and totals |
| `orders.json` | Delivered, shipped, processing, out-for-delivery, cancelled |
| `reviews.json` | Product reviews, including verified purchases |
| `coupons.json` | Promo codes, including an expired code for error states |
| `banners.json` | Homepage and category placements |
| `shipping-methods.json` | Standard, express, overnight, and freight |
| `notifications.json` | Order, promo, and price-drop alerts |

## Other domains

- **Auth** — login examples, sessions, devices, MFA, roles, permissions, API keys, password resets, and error payloads.
- **Blog** — published and draft articles, authors, comments, reactions, series, CMS pages, media, and subscribers.
- **CRM** — pipelines, leads, contacts, companies, deals, quotes, tasks, campaigns, and support tickets.
- **Events** — conferences and meetups, organizers, speakers, rooms, ticket types, attendees, discounts, and waitlist.
- **Finance** — bank accounts, cards, bills, budgets, recurring payments, merchants, investments, and transfers.
- **Jobs** — companies, departments, listings, candidates, applications, interviews, offers, and saved jobs.
- **Enterprise BI** — overview, reports, explorer, lineage, quality, forecasts, and ask/query screens.
- **Enterprise billing** — invoices, subscriptions, payments, collections, and ledger KPIs.
- **Enterprise banking** — accounts, clearing, payments, screening, exceptions, and liquidity.
- **Enterprise claims copilot** — workspace scorecards, KPIs, alerts, inbox, and a Vista property-ops layer (booking, occupancy, housekeeping, reservations).

Keep existing `id` values when you edit. If a cart line has `productId: 12`, that product must still exist.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for dataset rules. Open an issue with the [Bug report](https://github.com/poluru-labs/mockmama/issues/new?template=bug_report.yml), [Feature request](https://github.com/poluru-labs/mockmama/issues/new?template=feature_request.yml), or [Custom](https://github.com/poluru-labs/mockmama/issues/new?template=custom.yml) template.

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). To report a real secret or personal data leak, see [SECURITY.md](SECURITY.md) — do not open a public issue.

## License

MIT. See [LICENSE](LICENSE). Copyright (c) 2026 Poluru S.
