import { Tweet } from "./Tweet";
import type { author, media, thread as PrismaThread, tweet as PrismaTweet } from "@prisma/client";
import Link from "next/link";
// Display thread type
export type ThreadType = PrismaThread & { tweet: (PrismaTweet & { media: media[]; })[]; author: author };

export function Thread({ thread, numExpanded = 0 }: { thread: ThreadType, numExpanded?: number }): JSX.Element {


    if (thread?.tweet[0]) {

        // Sort tweets by tweeted_at
        thread.tweet.sort((tweet_a, tweet_b) => {
            if (tweet_a.tweeted_at < tweet_b.tweeted_at) {
                return -1;
            }
            if (tweet_a.tweeted_at > tweet_b.tweeted_at) {
                return 1;
            }
            return 0;
        })
        const first_tweet = thread?.tweet[0]
        const fully_expanded = (numExpanded == thread.tweet.length)

        return (
            <div className="thread-container flex flex-col md:mx-5 mb-5 break-inside-avoid-column border-2 rounded-lg  border-slate-800 ">
                <Tweet
                    tweet={first_tweet}
                    key={first_tweet.id.toString()}
                    author={thread.author}
                    likes={thread.like_count}
                    retweets={thread.retweet_count}
                    replies={thread.reply_count}
                />

                <div
                    className={`panel-open-partial`}
                >
                    {
                        thread.tweet.slice(1, numExpanded).map((tweet, index) => {
                            let last = false
                            if (index == thread.tweet.length - 2) {
                                last = true
                            }
                            return <Tweet tweet={tweet} author={thread.author} key={tweet.id.toString()} last={last} />
                        })
                    }
                </div>
                {/* Only show "Read more" button if tweet is not fullt expanded */}
                {!fully_expanded &&
                    <div className="p-4 rounded-b-sm bg-slate-800 border-white">
                        <Link className="" href={`/thread/${thread.id.toString()}`}>: Read more... :</Link>
                    </div>

                }
            </div>
        )
    }
    return <div></div>
}