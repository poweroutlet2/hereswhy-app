import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import superjson from 'superjson';
import { Thread } from '../../components/Thread';
import { createContextInner } from '../../server/trpc/context';
import { threadsRouter } from '../../server/trpc/router/threadsRouter';


export async function getStaticPaths() {
    return { paths: [], fallback: true }}

export async function getStaticProps({ params }: GetStaticPropsContext) {
    const ssg = createProxySSGHelpers({
        router: threadsRouter,
        ctx: await createContextInner(),
        transformer: superjson
    });
    const id = params?.id as string;
    const data = await ssg.get_thread_by_id.fetch({ thread_id: id })

    return {
        props: {
            author: data?.thread.author.username,
            description: data?.thread.tweet[0]?.content,
            thread: data?.thread
        },
        revalidate: 1800 // seconds
    }
}

export default function ThreadPage({ thread, author, description }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter()
    description = description ? description : ""
    
    // This will display while getStaticProps runs
    if (router.isFallback) {
        return (
            <div>Loadin tha thread...</div>
        )
    }
    return (
        <>
            <Head>
                <title>{`Thread by @${author}`}</title>
                <meta name="description" content={description} />
                <meta name="robots" content="index, follow" />

                <meta property="og:title" content={`Thread by @${author}`} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={`hereswhy.io/threads/${thread?.id}`} />
            </Head>
            <div className='mt-5'>
                <Thread thread={thread} fullyExpanded={true} />
            </div>
        </>
    )
}
