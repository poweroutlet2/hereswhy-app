import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router'
import ThreadShowcase from '../../components/ThreadShowcase';
import { createContextInner } from '../../server/trpc/context';
import { threadsRouter } from '../../server/trpc/router/threadsRouter';
import superjson from 'superjson'
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import Link from 'next/link';

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
export default function ThreadPage({ threads }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter()

    if (threads?.length > 0) {
        if (router.isFallback) {
            return (
                <div>Loadin threads by tha author {threads[0]?.author.username}...</div>
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
                <div className='mt-5'>
                    <h1 className="text-3xl">All threads by
                        <Link href={`http://twitter.com/${threads[0]?.author.username}`} target="_blank" rel="noopener noreferrer" className='gap-1 text-3xl hover:opacity-100 duration-300 hover:text-blue-500'>
                            {` @${threads[0]?.author.username}`}
                        </Link>
                        <ThreadShowcase threads={threads} />
                    </h1>
                </div>
            </>
        )
    }
}