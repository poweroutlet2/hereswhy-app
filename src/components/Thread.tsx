import { Tweet } from "./Tweet";
import type { author, media, thread as PrismaThread, tweet as PrismaTweet } from "@prisma/client";
import { useState } from "react";

// Display thread type
type Thread = PrismaThread & { tweet: (PrismaTweet & { media: media[]; })[]; author: author };

export function Thread({ thread, numExpanded = 0 }: { thread: Thread, numExpanded?: number }): JSX.Element {


    if (thread && thread.tweet[0]) {

        const first_tweet = thread?.tweet[0]
        const fully_expanded = (numExpanded == thread.tweet.length)
        return (
            <div className="w-full border break-inside-avoid-column border-neutral-600 max-w-prose m-5">
                <Tweet
                    tweet={first_tweet}
                    key={first_tweet.id.toString()}
                    author={thread.author}
                    likes={thread.like_count}
                    retweets={thread.retweet_count}
                    replies={thread.reply_count}
                />

                <div
                    className={`${(numExpanded == thread.tweet.length) ? "h-auto max-h-min" : "panel-open-partial"} ease-out`}
                    style={{
                        "overflow": "hidden",
                    }}
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
                    <div className="border border-white h-10">
                        <a href={`/thread/${thread.id.toString()}`}>Read more...</a>
                    </div>

                }
            </div>
        )
    }
    return <div></div>
}