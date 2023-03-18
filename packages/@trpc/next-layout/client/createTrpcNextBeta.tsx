"use client";

import type { CreateTRPCClientOptions } from "@trpc/client";
import type { AnyRouter, ProtectedIntersection } from "@trpc/server";
import type {
  CreateTRPCReactOptions,
  CreateReactUtilsProxy,
  CreateTRPCReactQueryClientConfig,
  DecoratedProcedureRecord,
} from "@trpc/react-query/shared";
import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import {
  createHooksInternal,
  getQueryClient,
  createReactProxyDecoration,
} from "@trpc/react-query/shared";
import { createFlatProxy } from "@trpc/server/shared";

export type WithTRPCConfig<TRouter extends AnyRouter> =
  CreateTRPCClientOptions<TRouter> & CreateTRPCReactQueryClientConfig;

type WithTRPCOptions<TRouter extends AnyRouter> =
  CreateTRPCReactOptions<TRouter> & WithTRPCConfig<TRouter>;

/**
 * @internal
 */
export interface CreateTRPCNextBase<TRouter extends AnyRouter> {
  useContext(): CreateReactUtilsProxy<TRouter, any>;
  Provider: ({ children }: { children: React.ReactNode }) => JSX.Element;
}

/**
 * @internal
 */
export type CreateTRPCNext<
  TRouter extends AnyRouter,
  TFlags,
> = ProtectedIntersection<
  CreateTRPCNextBase<TRouter>,
  DecoratedProcedureRecord<TRouter["_def"]["record"], TFlags>
>;

export function createTRPCNextBeta<TRouter extends AnyRouter, TFlags = null>(
  opts: WithTRPCOptions<TRouter>,
): CreateTRPCNext<TRouter, TFlags> {
  const trpc = createHooksInternal<TRouter>({
    unstable_overrides: opts.unstable_overrides,
  });

  const TRPCProvider = ({ children }: { children: React.ReactNode }) => {
    const [prepassProps] = useState(() => {
      const queryClient = getQueryClient(opts);
      const trpcClient = trpc.createClient(opts);
      return {
        queryClient,
        trpcClient,
      };
    });

    const { queryClient, trpcClient } = prepassProps;

    return (
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </trpc.Provider>
    );
  };

  return createFlatProxy((key) => {
    if (key === "Provider") {
      return TRPCProvider;
    }

    return createReactProxyDecoration(key, trpc);
  });
}
