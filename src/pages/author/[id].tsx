import Head from 'next/head';
import { useRouter } from 'next/router'
import Layout from '../../components/Layout';
import ThreadShowcase from '../../components/ThreadShowcase';
import { trpc } from '../../utils/trpc';

export function ThreadPage() {
    const router = useRouter()
    const id = router.query.id as string
    const { data, isError, error } = trpc.threads.get_threads_by_author_id.useQuery(
        { author_id: id },
        {
            refetchOnReconnect: false,
            refetchOnWindowFocus: false
        }
    )

    if (isError) {
        console.log(error.message);
    }
    if (data?.threads) {
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
                        <ThreadShowcase threads={data.threads} />
                    </div>
                </Layout>
            </>
        )
    }
}