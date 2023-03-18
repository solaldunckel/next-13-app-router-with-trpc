import { appRouter } from "@acme/api";
import { createContextInner } from "@acme/api/src/context";
import { auth as getAuth } from "@clerk/nextjs/app-beta";
import superjson from "superjson";
import { createTRPCNextLayout } from "@trpc/next-layout/server";

export const trpcRsc = createTRPCNextLayout({
  router: appRouter,
  transformer: superjson,
  createContext() {
    const auth = getAuth();

    return createContextInner({
      auth,
      req: null,
    });
  },
});
