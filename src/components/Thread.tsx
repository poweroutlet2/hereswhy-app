import { Tweet } from "./Tweet";
import type { author, media, thread as PrismaThread, tweet as PrismaTweet } from "@prisma/client";
import { useState } from "react";

// Display thread type
type Thread = PrismaThread & { tweet: (PrismaTweet & { media: media[]; })[]; author: author };

export function Thread({ thread, numExpanded = 0 }: { thread: Thread, numExpanded?: number }): JSX.Element {


    if (thread && thread.tweet[0]) {

        const first_tweet = thread?.tweet[0]
        //const threadHeight = document.getElementById(`thread-${thread.id.toString()}`)?.scrollHeight || 0
        //console.log(threadHeight * numExpanded)

        return (
            <>
                <div className="w-full border break-inside-avoid-column border-neutral-600 max-w-prose m-5" id={`thread-${thread.id.toString()}`} >
                    <Tweet
                        tweet={first_tweet}
                        key={first_tweet.id.toString()}
                        author={thread.author}
                        likes={thread.like_count}
                        retweets={thread.retweet_count}
                        replies={thread.reply_count}
                    />

                    <div
                        className={"panel-open ease-out"}
                        style={{
                            "maxHeight": '0px',
                            "overflow": "hidden",
                        }}
                    >
                        {
                            thread.tweet.slice(1, numExpanded).map((tweet, index) => {
                                return <Tweet tweet={tweet} author={thread.author} key={tweet.id.toString()} />
                            })
                        }
                    </div>
                    <div className="border border-white h-10">
                        <button>Click to expand</button>
                    </div>
                </ div >
                <div className="thread-container">
                </div>
            </>

        )
    }
    return <div></div>
}