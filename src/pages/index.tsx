import { threadsRouter } from "../server/trpc/router/threadsRouter";
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { createContextInner } from "../server/trpc/context";
import superjson from 'superjson';
import ThreadShowcase from "../components/ThreadShowcase";
import type { InferGetStaticPropsType } from "next";
import { env } from "../env/server.mjs";


export async function getStaticProps() {
  const ssg = createProxySSGHelpers({
    router: threadsRouter,
    ctx: await createContextInner(),
    transformer: superjson,
  });

  const data = await ssg.get_top_threads.fetch({ num_threads: 10, period: 'day' })
  // console.log('state', ssg.dehydrate());

  const rand = env.TWITTER_CLIENT_ID
  const rand2 = env.TWITTER_CLIENT_SECRET

  return {
    props: {
      trpcState: ssg.dehydrate(),
      threads: data.threads,
      rand: rand,
      rand2: rand2
    },
    revalidate: 600, // seconds
  };
}

export default function Home({ threads, rand, rand2 }: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(rand, rand2)
  if (threads) {
    return (
      <>
        <div className='mt-5'>
          <h1 className="text-3xl">Top Threads in the Past Day</h1>
          <ThreadShowcase threads={threads} />
        </div>
      </>
    );
  }
}

