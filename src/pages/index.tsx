import { type NextPage } from "next";
import Head from "next/head";

import { ThreadShowcase } from "../components/ThreadShowcase";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Threads</title>
        <meta name="description" content="Twitter threads" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-900 text-gray-200 overflow-x-hidden min-h-screen max-h-screen w-screen p-4 transition ease-in-out font-body selection:bg-orange-400 selection:text-gray-20">
        <ThreadShowcase />
      </main>
    </>
  );
};

export default Home;


