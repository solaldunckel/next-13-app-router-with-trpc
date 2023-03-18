/**
 * This file makes sure that we can get a storage that is unique to the current request context
 */

import type { AsyncLocalStorage } from "async_hooks";

// https://github.com/vercel/next.js/blob/canary/packages/next/client/components/request-async-storage.ts
const asyncStorage: AsyncLocalStorage<any> | {} =
  require("next/dist/client/components/request-async-storage").requestAsyncStorage;

function throwError(msg: string) {
  throw new Error(msg);
}

export function getRequestStorage<T>(): T {
  if ("getStore" in asyncStorage) {
    return asyncStorage.getStore() ?? throwError("Couldn't get async storage");
  }

  return asyncStorage as T;
}
