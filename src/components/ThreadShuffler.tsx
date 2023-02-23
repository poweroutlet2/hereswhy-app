import { trpc } from "../utils/trpc";
import { Thread } from "./Thread";
import TweetSkelly from "./TweetSkelly";

export default function ThreadShuffler() {
    const { data: thread, status } = trpc.threads.get_random_thread.useQuery({})
    // todo: disbale automatic invalidation of query
    if (status == "success" && thread) {
        return (
            <Thread thread={thread} />
        )
    } else {
        return (
            <TweetSkelly />
        )
    }
}