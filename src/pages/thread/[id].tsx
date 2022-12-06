import Head from 'next/head';
import type { InferGetStaticPropsType } from 'next';
import Layout from '../../components/Layout';
import { Thread } from '../../components/Thread';
import { trpc } from '../../utils/trpc';

export async function getStaticPaths() {
    return { paths: [], fallback: true }
}


export const getStaticProps = async ({ params }: { params: string }) => {
    const thread_id = params

    if (thread_id.length > 40) {
        return { notFound: true }
    }

    const { data, isError, error } = trpc.threads.get_thread_by_id.useQuery(
        { thread_id: thread_id },
        {
            refetchOnReconnect: false,
            refetchOnWindowFocus: false
        }
    )

    if (!data) {
        return { notFound: true }
    }

    if (isError) {
        console.log(error.message)
        return { notFound: true }
    }
    return {
        props: {
            thread: data?.thread
        }
    }

}


export default function ThreadPage({ thread }: InferGetStaticPropsType<typeof getStaticProps>) {
    if (!thread) {
        return <h1>Not Found</h1>
    }
    return (
        <>
            <Head>
                <title>Threads</title>
                <meta name="description" content="Thread" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <Thread thread={thread} numExpanded={thread.tweet.length} />
            </Layout>
        </>
    )
}