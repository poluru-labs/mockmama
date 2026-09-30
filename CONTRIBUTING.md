# Contributing to mockmama

Thanks for helping. This repo is **static mock JSON** for prototypes and fake APIs. Keep changes small, valid, and internally consistent.

By participating, you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).

## How to contribute

1. Open an [issue](https://github.com/poluru-labs/mockmama/issues/new/choose) before a large new dataset.
2. Fork the repo and create a branch from `main`.
3. Edit or add JSON under `mock/`.
4. Open a pull request using the PR template.

## Dataset rules

- Each file is one keyed array: `{ "products": [ ... ] }`.
- Keep existing record `id` values unless the issue is specifically to replace them.
- Cross-links must resolve: a `productId` in a cart must exist in `products.json`.
- Use fake data only (`@example.com`, example phone numbers, last4 card digits). No real personal data.
- Prefer [picsum.photos](https://picsum.photos) seeds for images.
- Include a few edge states (empty, pending, cancelled, expired) when they help a UI.
- Run a JSON parse check before you push:

```sh
python3 -c "import json, pathlib; [json.loads(p.read_text()) for p in pathlib.Path('mock').rglob('*.json')]; print('ok')"
```

## Adding a new domain

Put files in `mock/<domain>/` (for example `mock/jobs/`). Reuse IDs already in this repo when the domains overlap (same people, brands, or companies).

## Pull requests

- One dataset or one bug per PR when you can.
- Say which files changed and why.
- Do not commit secrets, `.env` files, or generated `node_modules`.

## License

Contributions are licensed under the [MIT License](LICENSE).
