import { type NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";

import { ThreadShowcase } from "../components/ThreadShowcase";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Threads</title>
        <meta name="description" content="Twitter threads" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Navbar />
      <main className=" bg-slate-900 text-gray-200 p-4 min-h-screen ease-in-out selection:bg-orange-400 selection:text-gray-20">
        <ThreadShowcase />
      </main>
    </>
  );
};

export default Home;


