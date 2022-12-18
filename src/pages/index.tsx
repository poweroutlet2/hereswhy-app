import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import ThreadShowcase from "../components/ThreadShowcase";
import { createContextInner } from "../server/trpc/context";
import { threadsRouter } from "../server/trpc/router/threadsRouter";
import superjson from 'superjson';
import { trpc } from "../utils/trpc";


export const getStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: threadsRouter,
    ctx: await createContextInner(),
    transformer: superjson,
  });

  await ssg.get_top_threads.prefetch({ num_threads: 10, period: 'day' })

  // console.log('state', ssg.dehydrate());
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};

export default function Home({ }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data, isError, error } = trpc.threads.get_top_threads.useQuery(
    { num_threads: 10, period: 'day' },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,

    },
  );

  if (isError) {
    console.log(error.message);
    return <h1>Error fetching threads!</h1>
  }

  if (data?.threads) {
    const threads = data.threads

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


  return <div>Loading...</div>
}
