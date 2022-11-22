import { router } from "../trpc";
import { authRouter } from "./auth";
import { threadsRouter } from "./threadsRouter";

export const appRouter = router({
  threads: threadsRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
