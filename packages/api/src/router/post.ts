import { db } from "@acme/db";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { clerkClient } from "@clerk/nextjs/server";

export const postRouter = router({
  all: publicProcedure.query(async ({ ctx }) => {
    return db
      .selectFrom("Post")
      .selectAll()
      .orderBy("Post.createdAt", "desc")
      .execute();
  }),

  create: publicProcedure
    .input(
      z.object({
        content: z.string().min(1).max(30),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      let startTime = new Date();

      const user = ctx.auth?.userId
        ? await clerkClient.users.getUser(ctx.auth?.userId)
        : null;

      let endTime = new Date();

      const fetchUserTime = endTime.getTime() - startTime.getTime();

      startTime = new Date();

      const res = await db
        .insertInto("Post")
        .values({
          content: input.content,
          author: user?.firstName,
        })
        .execute();

      endTime = new Date();

      const fetchPostTime = endTime.getTime() - startTime.getTime();

      console.log(`Fetched user in ${fetchUserTime}ms`);
      console.log(`Inserted post in ${fetchPostTime}ms`);

      return res;
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const startTime = new Date();

      const res = await db
        .deleteFrom("Post")
        .where("Post.id", "=", input.id)
        .execute();

      const endTime = new Date();

      console.log(
        `Deleted post in ${endTime.getTime() - startTime.getTime()}ms`,
      );
      return res;
    }),
});
