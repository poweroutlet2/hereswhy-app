import type { list } from "@prisma/client";
import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      lists: { saved_thread: { thread_id: bigint; }[]; id: number; name: string }[];
    } & DefaultSession["user"];
  }
}
