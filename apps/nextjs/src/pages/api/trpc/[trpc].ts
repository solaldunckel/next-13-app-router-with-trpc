import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";
import { appRouter } from "@acme/api";
import { createContextInner } from "@acme/api/src/context";
import { getAuth } from "@clerk/nextjs/server";

export const runtime = "edge";

export default function handler(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext() {
      const auth = getAuth(req);

      return createContextInner({
        req,
        auth,
      });
    },
    onError({ error }) {
      if (error.code === "INTERNAL_SERVER_ERROR") {
        console.error("Caught TRPC error:", error);
      }
    },
  });
}
