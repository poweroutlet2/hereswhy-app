import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { createContextInner } from "../../server/trpc/context";
import { threadsRouter } from "../../server/trpc/router/threadsRouter";
import superjson from 'superjson'
import { trpc } from "../../utils/trpc";
import ThreadShowcase from "../../components/ThreadShowcase";
import Head from "next/head";

export async function getServerSideProps(
    context: GetServerSidePropsContext<{ id: string }>,
) {
    const ssg = createProxySSGHelpers({
        router: threadsRouter,
        ctx: await createContextInner(),
        transformer: superjson
    });
    const id = context.params?.id as string;
    await ssg.get_threads_by_list.prefetch({ list_id: id })

    return {
        props: {
            trpcState: ssg.dehydrate(),
            id,
        },
    };
}
export default function ListPage(props: InferGetServerSidePropsType<typeof getServerSideProps>,) {
    const { id } = props

    const { data } = trpc.threads.get_threads_by_list.useQuery({ list_id: id })
    if (data) {
        return (
            <>
                <Head>
                    <meta name="robots" content="noindex, nofollow" />
                </Head>
                <ThreadShowcase threads={data} />
            </>
        )
    } else {
        <>No threads here...</>
    }

}