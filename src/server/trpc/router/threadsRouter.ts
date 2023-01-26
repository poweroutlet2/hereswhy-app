import { z } from "zod";
import { db_get_thread, db_get_threads_by_author, db_get_top_threads, search_threads } from "../../../utils/db";

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
        thread: z.string().or(z.string()),
        list: z.string().or(z.number()).optional()
      })
    )
    .query(async ({ input }) => {
      return
    })

});
