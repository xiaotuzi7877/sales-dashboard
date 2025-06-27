This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Sales Dashboard

A **Next.js 15 + TypeScript + TailwindCSS** demo that visualises yearly sales with an Atomic-Design component tree.

- Loads data through a **server-side API route** (`/api/sales`)
- Lets users **switch** Bar / Line / Pie charts
- Provides a **minimum-sales filter** input
- Includes a **dashboard** page with KPI cards
- Deployed on **Vercel** – every push to `main` auto-rebuilds

---

## Live Demo

| Environment | URL |
|-------------|-----|
| Production  | <https://sales-dashboard-rouge-three.vercel.app> |

---

##  Features

| Area | Details |
|------|---------|
| Multiple chart types | Recharts + toggle buttons |
| Custom filter input  | Number field filters by sales ≥ threshold |
| Server API           | `/api/sales` reads `/data/sales.json` (revalidate = 3600 s) |
| Atomic Design        | `atoms/ → molecules → organisms` component folders |
| Dashboard page       | KPI cards + chart in `app/dashboard/page.tsx` |
| CI / CD              | GitHub → Vercel hobby tier |

---

## Stack

| Layer     | Tech |
|-----------|------|
| Framework | Next.js 15 (App Router) |
| Language  | TypeScript |
| Styling   | TailwindCSS |
| Charts    | Recharts |
| Data build| Node script + csv-parse |
| Hosting   | Vercel |
| Linting   | ESLint, `tsc --noEmit` |

---

## Local start

```bash
git clone https://github.com/xiaotuzi7877/sales-dashboard.git
cd sales-dashboard

pnpm install                     # install deps
node scripts/csv-to-json.js      # CSV ➜ data/sales.json
pnpm dev                         # http://localhost:3000


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
