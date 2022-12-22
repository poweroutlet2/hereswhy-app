import { threadsRouter } from "../server/trpc/router/threadsRouter";
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { createContextInner } from "../server/trpc/context";
import superjson from 'superjson';
import Head from "next/head";
import Layout from "../components/Layout";
import ThreadShowcase from "../components/ThreadShowcase";
import type { InferGetStaticPropsType } from "next";


export async function getStaticProps() {
  const ssg = createProxySSGHelpers({
    router: threadsRouter,
    ctx: await createContextInner(),
    transformer: superjson,
  });

  const data = await ssg.get_top_threads.fetch({ num_threads: 10, period: 'day' })
  // console.log('state', ssg.dehydrate());
  return {
    props: {
      trpcState: ssg.dehydrate(),
      threads: data.threads
    },
    revalidate: 600, // seconds
  };
}

export default function Home({ threads }: InferGetStaticPropsType<typeof getStaticProps>) {

  if (threads) {
    return (
      <>
        <Head>
          <title>Threads</title>
          <meta name="description" content="Twitter threads" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Head>
        <Layout>
          <div className='mt-5'>
            <h1 className="text-3xl">Top Threads in the Past Day</h1>
            <ThreadShowcase threads={threads} />
          </div>
        </Layout>
      </>
    );
  }
}

