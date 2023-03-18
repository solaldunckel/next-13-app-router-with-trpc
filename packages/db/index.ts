import { Kysely } from "kysely";
import type { DB } from "./schema";
import { PlanetScaleDialect } from "kysely-planetscale";

export type KyselyClient = Kysely<DB>;

export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
    fetch: (url, options) => {
      return fetch(url, {
        cache: "default",
        ...options,
      });
    },
  }),
});

export type { DB } from "./schema";
export type {
  InsertObject,
  ExpressionBuilder,
  StringReference,
  Selectable,
  Insertable,
} from "kysely";
export { sql } from "kysely";
