import Head from 'next/head';
import { useRouter } from 'next/router'
import Layout from '../../components/Layout';
import { Thread } from '../../components/Thread';
import { trpc } from '../../utils/trpc';

export default function ThreadPage() {
    const router = useRouter()
    const id = router.query.id as string
    const { data, isError, error } = trpc.threads.get_thread_by_id.useQuery(
        { thread_id: id },
        {
            refetchOnReconnect: false,
            refetchOnWindowFocus: false
        }
    )

    if (isError) {
        console.log(error.message);
    }
    if (data?.thread) {
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
                        <Thread thread={data.thread} fullyExpanded={true} />
                    </div>
                </Layout>
            </>
        )
    }
}