import { Tweet } from "./Tweet";
import type { author, media, thread as PrismaThread, tweet as PrismaTweet } from "@prisma/client";
import { FirstTweet } from "./FirstTweet";

// Display thread type
type Thread = PrismaThread & { tweet: (PrismaTweet[] & {media: media[];}); author: author };

export function Thread({ thread }: { thread: Thread }): JSX.Element {
    if (thread) {
        return (
            <div className="thread">
                {
                    thread.tweet.map((tweet, index) => {
                        if (index == 0) {
                            return <FirstTweet 
                            tweet={tweet} 
                            key={tweet.id.toString()} 
                            author={thread.author}
                            likes={thread.like_count}
                            retweets={thread.retweet_count}
                            replies={thread.reply_count} />
                        }
                        return <Tweet tweet={tweet} key={tweet.id.toString()} />
                    })
                }
            </div>
        )
    }
    return <div></div>
}