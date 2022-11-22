import { z } from "zod";
import { db_get_thread, db_get_top_threads_tweets } from "../../../utils/db";

import { router, publicProcedure } from "../trpc";

export const threadsRouter = router({
  get_top_threads: publicProcedure
    .input(
      z.object({
        num_threads: z.number(),
        period: z.string().default('today')
      })
    )
    .query(async ({ input }) => {
      const threads = await db_get_top_threads_tweets(input.num_threads, input.period);
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
    })
});
