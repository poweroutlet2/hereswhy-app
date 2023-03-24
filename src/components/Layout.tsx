import Head from "next/head";
import type { ReactNode } from "react";
import Navbar from "./Navbar";

type LayoutProps = {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Head>
                <title>Threads</title>
                <meta name="description" content="Twitter threads" />
                <meta name="google-site-verification" content="lNEy4vuEriMjkUYixMPclHQ_VQiWqBfK3hQg6rwwjwE" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </Head>
            <main className="min-w-full h-screen flex flex-col items-center overflow-x-hidden ease-in-out bg-gray-100 text-gray-900 dark:text-slate-200 dark:bg-gradient-to-b from-gray-900 via-[#0d0d3e] to-[#000030]">
                <Navbar /> {/* Putting this outside main resulted in 2 scrollbars ? */}
                {children}
            </main>
        </>
    )
}