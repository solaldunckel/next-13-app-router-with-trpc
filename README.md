# Next.js 13 App Router

This is an official Yarn v1 starter turborepo.

### Apps and Packages

- `next`: [Next.js](https://nextjs.org/) app
- `api`: tRPC v10 router used by next on the server
- `db`: Kysely + Prisma
- `config`: `eslint`, `tsconfig` and `tailwind` configs

## Features

- Edge Runtime for the API + every React Server Component
- tRPC
- Kysely for type-safe SQL
  - Prisma is used for defining the schema + pushing it to Planetscale. No @prisma/client is generated, instead we generate `schema.d.ts` is generated for Kysely to infer types.
- Clerk for Authentication
- Hydratation for tRPC fetching
