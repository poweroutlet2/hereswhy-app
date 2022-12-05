import Head from 'next/head';
import { useRouter } from 'next/router'
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
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
                    <meta name="description" content="Thread" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Layout>
                    <Thread thread={data.thread} numExpanded={data.thread.tweet.length} />
                </Layout>
            </>
        )
    }
    return <div className="thread-loading">Loading...</div>
}