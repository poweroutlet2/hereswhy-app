import { trpc } from "../utils/trpc";
import { Thread } from "./Thread";
import TweetSkelly from "./TweetSkelly";

export default function ThreadShuffler() {
    const { data: count } = trpc.threads.get_thread_count.useQuery({}, { cacheTime: 10 * 60 * 1000 })
    const { data: thread, status, refetch } = trpc.threads.get_random_thread.useQuery({ count: count }, { enabled: false })
    // todo: disbale automatic invalidation of query
    if (status === "success" && thread) {
        return (
            <Thread thread={thread} />
        )
    } else {
        return (
            <TweetSkelly />
        )
    }
}