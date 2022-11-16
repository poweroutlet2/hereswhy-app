import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { ThreadShowcase } from "../components/ThreadShowcase";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Threads</title>
        <meta name="description" content="Twitter threads" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-900 text-gray-200 transition ease-in-out font-body selection:bg-orange-400 selection:text-gray-20">
        <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
          <ThreadShowcase />
        </main>
      </div>
    </>
  );
};

export default Home;


