import Head from 'next/head';
import { useRouter } from 'next/router'
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { Thread } from '../../components/Thread';
import { trpc } from '../../utils/trpc';

export default function threadPage() {
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
                <Navbar />
                <main className="bg-gray-900 text-gray-200 flex justify-center overflow-x-hidden min-w-screen w-screen transition ease-in-out font-body selection:bg-orange-400 selection:text-gray-20">
                    <Thread thread={data.thread} numExpanded={data.thread.tweet.length} />
                </main>
                <Footer />
            </>
        )
    }
    return <div className="thread-loading">Loading...</div>
}