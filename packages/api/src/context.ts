import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import type { GetServerSidePropsContext } from "next";
import { getAuth } from "@clerk/nextjs/server";
import type {
  SignedInAuthObject,
  SignedOutAuthObject,
} from "@clerk/nextjs/dist/api";
import { db } from "@acme/db";
import type { NextRequest } from "next/server";

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type CreateContextOptions = {
  auth: SignedInAuthObject | SignedOutAuthObject | null;
  req: NextRequest | GetServerSidePropsContext["req"] | null;
};

/** Use this helper for:
 *  - testing, where we dont have to Mock Next.js' req/res
 *  - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://beta.create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    auth: opts.auth,
    req: opts.req,
    db,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const auth = getAuth(opts.req);

  return await createContextInner({
    auth,
    req: opts.req,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
