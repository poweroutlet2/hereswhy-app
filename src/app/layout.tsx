import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <Head>
            <title>Threads</title>
            <meta name="description" content="Twitter threads" />
            <meta name="google-site-verification" content="lNEy4vuEriMjkUYixMPclHQ_VQiWqBfK3hQg6rwwjwE" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Head>

        <body>
                <Navbar />
                <main className="min-h-screen min-w-full flex flex-col items-center overflow-x-clip ease-in-out bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-slate-200">
                    {children}
                </main>
        </body>
      </html>
    );
  }