import { Tweet } from "./Tweet";
import type { thread as PrismaThread, tweet as PrismaTweet } from "@prisma/client";

type Thread = PrismaThread & { tweet: PrismaTweet[] };

export function Thread({ thread }: { thread: Thread }): JSX.Element {
    if (thread) {
        return (
            <div className="thread">
                {
                    thread.tweet.map((tweet) => {
                        return <Tweet tweet={tweet} key={tweet.id.toString()} />
                    })
                }
            </div>
        )
    }
    return <div></div>
}