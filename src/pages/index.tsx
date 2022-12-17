import type { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import ThreadShowcase from "../components/ThreadShowcase";
import { trpc } from "../utils/trpc";


import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { threadsRouter } from "../server/trpc/router/threadsRouter";
import superjson from 'superjson';
import { createContextInner } from "../server/trpc/context";


export async function getStaticProps() {
  const ssg = createProxySSGHelpers({
    router: threadsRouter,
    ctx: await createContextInner(),
    transformer: superjson, // optional - adds superjson serialization
  });

  const data = await ssg.get_top_threads.fetch({ num_threads: 10, period: 'day' });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      threads: data?.threads
    },
  };
}

export default function Home({ threads }: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <>
      <Head>
        <title>Threads</title>
        <meta name="description" content="Twitter threads" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Layout>
        <ThreadShowcase threads={threads} />
      </Layout>
    </>
  );
}



