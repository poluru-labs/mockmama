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
| [`mock/fitness/`](mock/fitness/) | Gyms, members, classes, workouts, memberships, check-ins |
| [`mock/food-delivery/`](mock/food-delivery/) | Restaurants, menus, carts, orders, couriers, promos |
| [`mock/weather/`](mock/weather/) | Locations, current conditions, forecasts, alerts, air quality |
| [`mock/travel/`](mock/travel/) | Destinations, hotels, flights, bookings, activities, itineraries |
| [`mock/tasks/`](mock/tasks/) | Workspaces, projects, tasks, sprints, boards, comments |
| [`mock/music/`](mock/music/) | Artists, albums, tracks, playlists, podcasts, playback, charts |
| [`mock/movies/`](mock/movies/) | Films, cinemas, showtimes, tickets, cast, watchlist, streaming |
| [`mock/logistics/`](mock/logistics/) | Warehouses, shipments, carriers, tracking, inventory, fulfillment |
| [`mock/library/`](mock/library/) | Books, members, loans, holds, branches, programs, digital items |
| [`mock/learning/`](mock/learning/) | Courses, lessons, enrollments, quizzes, paths, cohorts, certificates |
| [`mock/ai-contract-review-workspace/`](mock/ai-contract-review-workspace/) | Contract review agents, risks, playbook versions, SLAs, webhooks, redlines, queue (manifest 1.2.0) |
| [`mock/ai-course-creator/`](mock/ai-course-creator/) | Course design agents, cohorts, certificates, LMS exports, publish schedule, rubrics, queue |
| [`mock/ai-customer-support-console/`](mock/ai-customer-support-console/) | Tickets, KB gaps, saved replies, agent performance, customer timelines, incidents |
| [`mock/ai-data-analysis-workbench/`](mock/ai-data-analysis-workbench/) | Datasets, lineage, query favorites, warehouse costs, notebooks, alert subscriptions |
| [`mock/ai-dataset-labeling-platform/`](mock/ai-dataset-labeling-platform/) | Projects, import jobs, inter-rater reports, certifications, consensus, QA exports |
| [`mock/ai-email-assistant/`](mock/ai-email-assistant/) | Inbox, shared mailboxes, send audit, spam reports, templates, scheduling |
| [`mock/ai-evaluation-dashboard/`](mock/ai-evaluation-dashboard/) | Eval suites, benchmark trends, budgets, dataset snapshots, postmortems, promotion gates |
| [`mock/ai-image-generation-gallery/`](mock/ai-image-generation-gallery/) | Image generations, presets, collections, approvals, seed sweeps |
| [`mock/ai-interior-design-studio/`](mock/ai-interior-design-studio/) | Design projects, briefs, moodboards, layouts, shopping lists |
| [`mock/ai-interview-coach/`](mock/ai-interview-coach/) | Practice sessions, drills, STAR feedback, recordings, coaching queue |
| [`mock/ai-invoice-processing/`](mock/ai-invoice-processing/) | Invoice extraction, validation, vendors, exceptions, payment batches |
| [`mock/ai-language-tutor/`](mock/ai-language-tutor/) | Lessons, dialogues, vocabulary, pronunciation, review schedule |
| [`mock/ai-meal-planner/`](mock/ai-meal-planner/) | Weekly menus, macros, grocery lists, pantry, preferences |
| [`mock/ai-meeting-notes/`](mock/ai-meeting-notes/) | Meetings, live summaries, decisions, action items, calendar sync |
| [`mock/ai-model-comparison/`](mock/ai-model-comparison/) | Model benchmarks, latency, quality scores, comparison runs, leaderboard |
| [`mock/ai-photo-editing-studio/`](mock/ai-photo-editing-studio/) | NL edits, batch retouch, presets, masks, export profiles, approval queue |
| [`mock/ai-presentation-builder/`](mock/ai-presentation-builder/) | Decks, slide templates, brand kits, speaker notes, export jobs, pacing |
| [`mock/ai-prompt-playground/`](mock/ai-prompt-playground/) | Experiments, parameter grids, leaderboard, guardrails, share links, costs |
| [`mock/ai-quiz-generator/`](mock/ai-quiz-generator/) | Question banks, difficulty bands, integrity checks, LMS exports, proctor alerts |
| [`mock/ai-receipt-organizer/`](mock/ai-receipt-organizer/) | OCR receipts, categories, duplicates, tax summaries, reimbursements, sync |
| [`mock/ai-research-assistant/`](mock/ai-research-assistant/) | Research threads, sources, synthesis, citation graph, reading queue, gaps |
| [`mock/ai-resume-builder/`](mock/ai-resume-builder/) | Profiles, bullet scores, ATS fit, cover letters, portfolios, applications |
| [`mock/ai-seo-content-optimizer/`](mock/ai-seo-content-optimizer/) | On-page audits, SERP snapshots, intent clusters, redirects, competitor gaps |
| [`mock/ai-social-content-planner/`](mock/ai-social-content-planner/) | Calendars, campaigns, captions, hashtags, approvals, trend signals |
| [`mock/ai-spreadsheet-assistant/`](mock/ai-spreadsheet-assistant/) | Workbook plans, formulas, pivots, macros, validation rules, cell comments |
| [`mock/ai-study-companion/`](mock/ai-study-companion/) | Study blocks, flashcards, spaced repetition, streaks, weak spots, exam prep |
| [`mock/ai-transcription-workspace/`](mock/ai-transcription-workspace/) | Recordings, diarization, chapters, captions, glossary, translation exports |
| [`mock/ai-travel-planner/`](mock/ai-travel-planner/) | Trip briefs, itineraries, agendas, packing, visa checklists, weather, alerts |
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
- **Fitness** — gyms, trainers, members, plans, classes, bookings, workouts, sessions, check-ins, and waitlist.
- **Food delivery** — restaurants, menu items, customers, addresses, carts, orders, couriers, promos, and reviews.
- **Weather** — locations, current and hourly forecasts, alerts, air quality, saved places, and radar metadata.
- **Travel** — destinations, hotels, room types, flights, bookings, activities, wishlists, and trip itineraries.
- **Tasks** — workspaces, projects, kanban columns, sprints, assignments, comments, and activity feed.
- **Music** — artists, albums, tracks, playlists, podcasts, lyrics, radio, devices, playback, likes, and charts.
- **Movies** — films, cast, cinemas, showtimes, tickets, trailers, collections, watchlist, and streaming progress.
- **Logistics** — warehouses, carriers, shipments, packages, tracking events, pick tasks, inventory, and exceptions.
- **Library** — catalog, copies, members, loans, holds, fines, branch programs, and digital lending.
- **Learning** — courses, lessons, students, enrollments, quizzes, assignments, paths, cohorts, and badges.
- **AI contract review** — contracts, clauses, agents, rubrics, obligations, playbook diffs, redlines, queue, and MSA alerts.
- **AI course creator** — courses, outcomes, modules, syllabi, lessons, assessments, rubrics, source materials, and review queue.
- **AI customer support** — tickets, customers, KB articles, macros, sentiment coaching, SLA, escalations, incidents, and inbox views.
- **AI data analysis** — datasets, schema catalogs, queries, chart recommendations, insights, notebooks, runs, quality alerts, and exports.
- **AI dataset labeling** — projects, guidelines, items, annotations, AI suggestions, consensus, QA, waves, and export manifests.
- **AI email assistant** — threads, inbox triage, tone drafts, summaries, templates, follow-ups, quarantine, and scheduled sends.
- **AI evaluation** — golden sets, eval runs, regression alerts, scorecards, raters, promotion gates, and scheduled jobs.
- **AI image gallery** — generations, style presets, collections, approvals, and seed sweeps.
- **AI interior design** — client projects, briefs, moodboards, layouts, and shopping lists.
- **AI interview coach** — behavioral and technical drills, STAR feedback, and session recaps.
- **AI invoice processing** — OCR extraction, vendor match, validation, and AP routing.
- **AI language tutor** — CEFR lessons, dialogues, corrections, and spaced review.
- **AI meal planner** — macro plans, weekly menus, grocery lists, and leftovers.
- **AI meeting notes** — transcripts, decisions, action items, and calendar sync.
- **AI model comparison** — side-by-side benchmarks, latency, and promotion gates.
- **AI photo editing** — natural-language layers, batch retouch, before/after review, and export profiles.
- **AI presentation builder** — narrative outlines, brand kits, speaker notes, and deck exports.
- **AI prompt playground** — A/B experiments, parameter sweeps, versioned prompts, and shareable links.
- **AI quiz generator** — banks, difficulty tuning, answer keys, integrity checks, and LMS export.
- **AI receipt organizer** — OCR intake, categorization, duplicate detection, and reimbursement routing.
- **AI research assistant** — literature briefs, source synthesis, citation graphs, and reading queues.
- **AI resume builder** — ATS scoring, keyword gaps, cover letters, and application tracking.
- **AI SEO content optimizer** — on-page audits, SERP tracking, intent clusters, and redirect maps.
- **AI social content planner** — calendars, caption variants, hashtag sets, and approval workflows.
- **AI spreadsheet assistant** — cleanup plans, formula drafts, pivot hints, and workbook versions.
- **AI study companion** — mastery roadmaps, flashcards, spaced repetition, and tutor sessions.
- **AI transcription workspace** — diarization, chapters, cleanup passes, captions, and quality flags.
- **AI travel planner** — multi-city itineraries, budgets, packing lists, visa checks, and travel alerts.
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
