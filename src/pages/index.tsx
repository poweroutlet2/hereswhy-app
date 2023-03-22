import { threadsRouter } from "../server/trpc/router/threadsRouter";
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { createContextInner } from "../server/trpc/context";
import superjson from 'superjson'
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

        <h1 className="text-3xl p-3 self-start">Trending Threads From Twitter</h1>
        <div className="pt-1 bg-blue-900 bg-opacity-10 min-w-max">
          <ThreadMarquee threads={trending_threads} />
        </div>

        <h1 className="text-3xl p-3 self-start">Top Recent Threads</h1>
        <div className=''>
          <ThreadShowcase threads={top_threads} />
        </div>
      </>
    );
  }
}

