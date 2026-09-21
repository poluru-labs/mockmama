# mockmama

Mock JSON for UI prototypes, design-system demos, and fake APIs.

Use this repo when a storefront, dashboard, or design sandbox needs realistic records (products, carts, orders) without standing up a backend. Data is static, internally consistent, and safe to commit: IDs in carts, watchlists, and orders point at real catalog items.

## Ecommerce dataset

`mock/ecommerce/` is a full shopper portal snapshot:

| File | What it holds |
| --- | --- |
| `categories.json` | Nested categories (electronics, fashion, home, sports, beauty, books) |
| `products.json` | Catalog with variants, prices, stock, ratings, and image URLs |
| `brands.json` / `sellers.json` | Brand and marketplace seller records |
| `users.json` | Sample customers plus an admin account |
| `addresses.json` / `payment-methods.json` | Saved shipping and card-on-file data (last4 only) |
| `watchlist.json` | Saved items with price-drop and back-in-stock flags |
| `cart.json` | Active carts with line items and totals |
| `orders.json` | Orders in delivered, shipped, processing, out-for-delivery, and cancelled states |
| `reviews.json` | Product reviews, including verified purchases |
| `coupons.json` | Promo codes, including an expired code for error states |
| `banners.json` | Homepage and category placements |
| `shipping-methods.json` | Standard, express, overnight, and freight |
| `notifications.json` | Order, promo, and price-drop alerts |

Each file is a single keyed array, for example `{ "products": [ ... ] }`, so it works with `fetch()`, json-server, or a local mock layer.

Demo logins in `users.json` use `demo123` (customers) and `admin123` (admin). Product images are [picsum.photos](https://picsum.photos) seeds, not real merchandise photos.

## License

MIT. See [LICENSE](LICENSE).
