import { protectedProcedure, router } from "../trpc";

export const protectedRouter = router({
  message: protectedProcedure.query(async () => {
    return "This message is fetched from a protected procedures.";
  }),
});
