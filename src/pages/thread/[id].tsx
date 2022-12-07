import Head from 'next/head';
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Layout from '../../components/Layout';
import { Thread } from '../../components/Thread';
import { trpc } from '../../utils/trpc';

export const getStaticPaths: GetStaticPaths = async () => {
    return { paths: [], fallback: true }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const thread_id = context.params?.id?.toString()

    if (!thread_id) {
        return { notFound: true }
    }
    console.log(thread_id)
    const { data, isError, error } = trpc.threads.get_thread_by_id.useQuery(
        { thread_id: thread_id },
        {
            refetchOnReconnect: false,
            refetchOnWindowFocus: false
        }
    )

    if (!data?.thread) {
        return { notFound: true }
    }

    if (isError) {
        console.log(error.message)
        return { notFound: true }
    }
    return {
        props: {
            thread: data.thread
        },
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