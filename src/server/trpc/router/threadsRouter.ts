import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { db_get_thread, db_get_threads_by_author, db_get_top_threads, get_user_lists, get_threads_by_list, search_threads } from "../../../utils/db";
import { save_thread, unsave_thread } from "../../../utils/dbUser";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const threadsRouter = router({
  get_top_threads: publicProcedure
    .input(
      z.object({
        num_threads: z.number(),
        period: z.string().default('today')
      })
    )
    .query(async ({ input }) => {
      const threads = await db_get_top_threads(input.num_threads, input.period);
      return {
        threads: threads
      }
    }),
  get_thread_by_id: publicProcedure
    .input(
      z.object({
        thread_id: z.bigint().or(z.string()),
      })
    )
    .query(async ({ input }) => {
      const thread = await db_get_thread(input.thread_id);
      return {
        thread: thread
      }
    }),
  get_threads_by_author_id: publicProcedure
    .input(
      z.object({
        author_id: z.bigint().or(z.string()),
      })
    )
    .query(async ({ input }) => {
      const threads = await db_get_threads_by_author(input.author_id);
      return {
        threads: threads
      }
    }),
  search_threads: publicProcedure
    .input(
      z.object({
        term: z.string(),
      })
    )
    .query(async ({ input }) => {
      const results = await search_threads(input.term);
      return {
        results: results
      }
    }),
  // get_top_authors: publicProcedure
  //   .input(
  //     z.object({})
  //   )
  //   .query(async ({ input }) => {
  //     const authors = await db_get_top_followed_authors();
  //     return {
  //       authors: authors
  //     }
  //   }),
  save_thread: protectedProcedure
    .input(
      z.object({
        thread_id: z.string().or(z.bigint()),
        list_id: z.number().optional()
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      await save_thread(input.thread_id, ctx.session.user.id, input.list_id)
    }),
  unsave_thread: protectedProcedure
    .input(
      z.object({
        thread_id: z.string().or(z.bigint()),
        list_id: z.number().optional()
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      await unsave_thread(input.thread_id, input.list_id);
    }),
  get_user_lists: publicProcedure
    .input(
      z.object({ user_id: z.string() })
    )
    .query(async ({ input }) => {
      return await get_user_lists(input.user_id);
    }),
  get_threads_by_list: publicProcedure
    .input(
      z.object({ list_id: z.string().or(z.number()) })
    )
    .query(async ({ input }) => {
      return get_threads_by_list(Number(input.list_id))
    })
});
