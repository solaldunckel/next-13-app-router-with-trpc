# Next.js 13 App Router

### Apps and Packages

- `next`: Next.js 13 with App Router
- `@trpc/next-layout`: Utils to create a tRPC client for Next.js 13.
- `api`: tRPC v10 router used by next on the server
- `db`: Kysely + Prisma
- `config`: `eslint`, `tsconfig` and `tailwind` configs

### Features

- Turborepo
- Edge Runtime for the API + every React Server Component
- tRPC
- [Kysely](https://github.com/koskimas/kysely) for type-safe SQL
  - MySQL database hosted to [Planetscale](https://app.planetscale.com)
  - Prisma is used to defined the schema + to push it. No @prisma/client is generated, instead we use the [prisma-kysely](https://github.com/valtyr/prisma-kysely) package to generate a `schema.d.ts` for Kysely to infer types.
- [Clerk](https://clerk.dev) for Authentication

### tRPC

You have a few options on how you want to fetch your data with tRPC + Next 13 :

- Fetch the data in a React Server Component and render the HTML directly ([example](https://github.com/solaldunckel/next-13-app-router-with-trpc/blob/master/apps/nextjs/src/app/post/rsc/page.tsx))
- Fetch the data in a React Server Component and hydrate the state to a Client Component ([example](https://github.com/solaldunckel/next-13-app-router-with-trpc/blob/master/apps/nextjs/src/app/post/hydrated/page.tsx))
- Fetch the data in a Client Component

### Fetch Cache

Next.js 13 uses a patched version of `fetch` with additional options to cache your requests.
Since we query the database through HTTP with the [@planetscale/database](https://github.com/planetscale/database-js) package, cache is working at the component level ([example](https://github.com/solaldunckel/next-13-app-router-with-trpc/blob/master/apps/nextjs/src/app/post/cached/page.tsx)).
