import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router'
import Layout from '../../components/Layout';
import ThreadShowcase from '../../components/ThreadShowcase';
import { createContextInner } from '../../server/trpc/context';
import { threadsRouter } from '../../server/trpc/router/threadsRouter';
import superjson from 'superjson'
import { createProxySSGHelpers } from '@trpc/react-query/ssg';

export async function getStaticPaths() {
    return { paths: [], fallback: true }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
    const ssg = createProxySSGHelpers({
        router: threadsRouter,
        ctx: await createContextInner(),
        transformer: superjson
    })
    const id = params?.id as string
    const data = await ssg.get_threads_by_author_id.fetch({ author_id: id })

    return {
        props: {
            threads: data.threads
        },
        revalidate: 600
    }

}
export default function ThreadPage({ threads }: InferGetStaticPropsType<typeof getStaticPaths>) {
    const router = useRouter()

    if (router.isFallback) {
        return (
            <Layout>
                <div>Loadin threads by tha author...</div>
            </Layout>
        )
    }

    return (
        <>
            <Head>
                <title>Threads</title>
                <meta name="description" content="Twitter threads" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </Head>
            <Layout>
                <div className='mt-5'>
                    <ThreadShowcase threads={threads} />
                </div>
            </Layout>
        </>
    )
}