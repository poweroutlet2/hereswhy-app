import { type NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
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
      <main className="min-h-screen overflow-x-hidden">
        <ThreadShowcase />
      </main>
      <Footer />
    </>
  );
};

export default Home;


