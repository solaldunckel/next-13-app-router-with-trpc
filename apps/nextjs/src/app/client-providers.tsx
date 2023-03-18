"use client";

import { trpcClient } from "../trpc/client/trpc-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ClerkProvider } from "@clerk/nextjs/app-beta/client";

export function ClientProviders(props: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ""}
    >
      <trpcClient.Provider>
        {props.children}
        <ReactQueryDevtools initialIsOpen={false} />
      </trpcClient.Provider>
    </ClerkProvider>
  );
}
