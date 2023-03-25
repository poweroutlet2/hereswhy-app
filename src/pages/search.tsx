import { createProxySSGHelpers } from "@trpc/react-query/ssg"
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { createContextInner } from "../server/trpc/context"
import { threadsRouter } from "../server/trpc/router/threadsRouter"
import superjson from 'superjson'
import ThreadShowcase from "../components/ThreadShowcase"

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
    if (data) {
        return (
            <>
                <h1 className="text-3xl mt-5">{data.length} threads found for the term: {`"${term}"`}</h1>
                <ThreadShowcase threads={data} />
            </>
        )
    }
}