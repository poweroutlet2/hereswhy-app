import { type NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";

import { ThreadShowcase } from "../components/ThreadShowcase";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
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
};

export default Home;


