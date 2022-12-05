import { Thread } from "./Thread";
import { trpc } from "../utils/trpc";



export function ThreadShowcase(): JSX.Element {
    const { data, isError, error } = trpc.threads.get_top_threads.useQuery(
        { num_threads: 10, period: 'week' },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,

        },
    );

    if (isError) {
        console.log(error.message);
    }
    if (data) {
        const threads = data.threads;
        return (
            < div className="showcase flex justify-center">
                <div className="xl:columns-2 3xl:columns-3 gap-2 p-4">
                    {
                        threads.map((thread, index) => {
                            // randomly choose number of expanded tweets
                            let numExpanded = Math.floor(Math.random() * (4)) + 1;
                            if (index % 3 == 0) {
                                numExpanded = Math.floor(Math.random() * (2)) + 1;
                            }

                            return <Thread thread={thread} numExpanded={numExpanded} key={thread.id.toString()} />
                        })
                    }
                </div>
            </div >
        )
    }

    return <div className="threads-showcase-loading">Loading...</div>
}