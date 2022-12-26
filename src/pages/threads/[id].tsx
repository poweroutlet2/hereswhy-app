import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import superjson from 'superjson';
import { Thread } from '../../components/Thread';
import { createContextInner } from '../../server/trpc/context';
import { threadsRouter } from '../../server/trpc/router/threadsRouter';


export async function getStaticPaths() {
    return { paths: [], fallback: true }
}

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
            thread: data?.thread
        },
        revalidate: 600 // seconds
    }
}

export default function ThreadPage({ thread }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter()
    // for more info on fallback: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
    // This will display while getStaticProps runs
    if (router.isFallback) {
        return (
            <div>Loadin the thread...</div>
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
                <Thread thread={thread} fullyExpanded={true} />
            </div>
        </>
    )
}
