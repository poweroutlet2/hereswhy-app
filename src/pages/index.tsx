import { type NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
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
      <Layout>
        <ThreadShowcase />
      </Layout>
    </>
  );
};

export default Home;


