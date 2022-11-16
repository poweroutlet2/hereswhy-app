import { Thread } from "./Thread";
import { trpc } from "../utils/trpc";



export function ThreadShowcase(): JSX.Element {
    const { data, isError, error } = trpc.example.get_top_threads.useQuery(
        { num_threads: 2, period: 'day' },
        { staleTime: 10000 },
    )

    if (isError) {
        console.log(error.message)
    }
    if (data) {
        return (
            <div className="flex justify-evenly">
                {
                    data.threads.map((thread) => {
                        return <Thread thread={thread} key={thread.id.toString()} />
                    })
                }
            </div>
        )
    }

    return <div className="threads-showcase-loading">Loading...</div>
}