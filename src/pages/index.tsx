import { threadsRouter } from "../server/trpc/router/threadsRouter";
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { createContextInner } from "../server/trpc/context";
import superjson from 'superjson';
import ThreadShowcase from "../components/ThreadShowcase";
import type { InferGetStaticPropsType } from "next";
import ThreadMarquee from "../components/ThreadMarquee";


export async function getStaticProps() {
  const ssg = createProxySSGHelpers({
    router: threadsRouter,
    ctx: await createContextInner(),
    transformer: superjson,
  });

  const top_threads = await ssg.get_top_threads.fetch({ num_threads: 10, period: 'day' })
  const trending_threads = await ssg.get_trending_threads.fetch({ num_threads: 10 })
  // console.log('state', ssg.dehydrate());

  return {
    props: {
      trpcState: ssg.dehydrate(),
      top_threads: top_threads.threads,
      trending_threads: trending_threads
    },
    revalidate: 1800, // seconds
  };
}

export default function Home({ top_threads, trending_threads }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (top_threads) {
    return (
      <>
        <div className="mt-5 flex flex-col">
          <h1 className="text-3xl ml-48">Trending Threads</h1>
          <ThreadMarquee threads={trending_threads} />
        </div>
        <div className='mt-5'>
          <h1 className="text-3xl">Top Threads in the Past Day</h1>
          <ThreadShowcase threads={top_threads} />
        </div>
      </>
    );
  }
}

