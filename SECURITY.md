# Security policy

This repository is **static mock JSON** for prototypes. It is not a production API and should not contain real secrets, passwords, or personal data.

## Supported versions

| Version | Supported |
| --- | --- |
| `main` (latest) | Yes |
| Older commits / forks | No |

## Reporting a vulnerability

Do **not** open a public issue for:

- Real credentials, API keys, or tokens committed to the repo
- Real personal data (emails, phones, addresses, full card numbers)
- Malicious payloads hidden in mock files

Report privately with [GitHub private vulnerability reporting](https://github.com/poluru-labs/mockmama/security/advisories/new).

Include:

- File path and, if relevant, the record `id`
- What was exposed and how you found it
- Whether the data appears to be real (not the intentional `demo123` / `@example.com` fixtures)

You should hear back within **7 days**. If we confirm a problem, we will remove or rotate the data on `main` and credit you if you want that.

## What is not a vulnerability

These are intentional mock fixtures. Do not report them as security issues:

- Demo passwords such as `demo123` and `admin123`
- Tokens labeled `mock-*-not-valid`
- `@example.com` emails, example phone numbers, and card **last4** only
- Public [picsum.photos](https://picsum.photos) image URLs

If you are unsure, use the private advisory form anyway.

## Secrets in a pull request

If you accidentally commit a real secret, rotate it at the provider first, then tell the maintainers through the private advisory form. Do not paste the secret into a public PR comment.
