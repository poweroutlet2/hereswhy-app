import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Analytics } from '@vercel/analytics/react';
import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import "yet-another-react-lightbox/styles.css";
import Layout from "../components/Layout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
