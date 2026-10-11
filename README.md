# বাজার দর (BazarDor)

**বাজার দর** is a Bengali-first market-price web app that helps people quickly check everyday product prices, compare market ranges, and browse current categories from one simple dashboard.

## Technologies

- Next.js -> Build the UI
- App router(Next.js) + Handle page navigation
- Tailwind CSS + Styling and responsiveness(DaisyUI, Hero UI)
- TypeScript
- BetterAuth

## Key features

1. **Live market prices** — Loads categories and product prices from the BazarDor API, including filtered category results and product details.
2. **Bengali-first experience** — Uses Bengali labels, product names, icons, price units, and responsive navigation for a local audience.
3. **Category browsing and sorting** — Explore eight market categories and sort products by price, name, or price movement.
4. **Price comparison** — Shows rising and falling prices with change indicators and market-level minimum, maximum, and average summaries.
5. **Secure account experience** — Supports Better Auth email/password sign-up, sign-in, protected product details, account profile updates, and sign-out.

## API endpoints

The dashboard reads from the BazarDor API:

- `GET /api/bazardor/categories` — all categories
- `GET /api/bazardor/categories/:slug` — one category
- `GET /api/bazardor/products` — all products
- `GET /api/bazardor/products?category=chal` — products filtered by category
- `GET /api/bazardor/products/:id` — one product

## Getting started

```bash
pnpm install
pnpm dev
```

For local authentication, configure the project environment with:

- `BETTER_AUTH_SECRET` — a random secret with at least 32 characters
- `POSTGRES_URL` or `POSTGRES_URL_NON_POOLING` — the Supabase Postgres connection string

Existing Supabase Auth accounts are separate from Better Auth accounts. Users migrating to this version need to create a new Better Auth account because Supabase password hashes cannot be imported directly.

## Project structure

```text
app/           Next.js routes and API handlers
components/    Shared navigation, cards, forms, and UI
lib/           API client, Better Auth, and database connection
public/        Static assets
```

## License

This project is intended for educational and demonstration use.

