import { createProxySSGHelpers } from "@trpc/react-query/ssg"
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { createContextInner } from "../server/trpc/context"
import { threadsRouter } from "../server/trpc/router/threadsRouter"
import superjson from 'superjson'
import ThreadShowcase from "../components/ThreadShowcase"
import Head from "next/head"

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
    const term = query.term as string
    const ssg = createProxySSGHelpers({
        router: threadsRouter,
        ctx: await createContextInner(),
        transformer: superjson
    })

    const results = await ssg.search_threads.fetch({ term: term })

    return {
        props: {
            term: term,
            data: results,
        },
    }
}

export default function SearchPage({ term, data }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <>
            <Head>
                <title>Threads</title>
                <meta name="description" content="Twitter threads" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </Head>
            <h1 className="text-3xl mt-5">{data.results.length} threads found for the term: {`"${term}"`}</h1>
            <ThreadShowcase threads={data.results} />
        </>
    )
}