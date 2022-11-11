import { z } from "zod";
import { db_get_top_threads_tweets } from "../../../utils/db";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
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
});
