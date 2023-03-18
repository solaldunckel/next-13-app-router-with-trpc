import { router } from "../trpc";
import { postRouter } from "./post";
import { protectedRouter } from "./protected";

export const appRouter = router({
  post: postRouter,
  protected: protectedRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
