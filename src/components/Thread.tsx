import { Tweet } from "./Tweet";
import type { author, media, thread as PrismaThread, tweet as PrismaTweet } from "@prisma/client";
import Link from "next/link";
import { HeaderTweet } from "./HeaderTweet";
// Display thread type
export type ThreadType = PrismaThread & { tweet: (PrismaTweet & { media: media[]; })[]; author: author };

export function Thread({ thread, fullyExpanded = true }: { thread: ThreadType, fullyExpanded?: boolean }): JSX.Element {

    // Set number of expanded tweets 
    let expanded = 1;
    if (thread?.length) {
        if (fullyExpanded) {
            expanded = thread.length
        } else if (thread.length <= 6) {
            expanded = 1
        } else if (thread.length > 7 && thread.length < 15) {
            expanded = 2
        } else {
            expanded = 3
        }
    }

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

        return (
            <div className="thread-container bg-white flex flex-col xl:mx-5 mb-5 break-inside-avoid-column border-2 rounded-2xl duration-200 shadow-md">
                <HeaderTweet
                    thread_id={thread.id}
                    tweet={first_tweet}
                    key={first_tweet.id.toString()}
                    author={thread.author}
                    media={first_tweet.media}
                    likes={thread.like_count}
                    retweets={thread.retweet_count}
                    replies={thread.reply_count}
                />
                {thread.tweet.slice(1, expanded).map((tweet) => {
                    return <Tweet key={tweet.id.toString()} tweet={tweet} author={thread.author} media={tweet.media} />
                })}
                {/* Only show "Read more" button if tweet is not fullt expanded */}

                {!fullyExpanded &&
                    <Link className="text-base" href={`/threads/${thread.id.toString()}`} passHref>
                        <div className="read-more flex p-4 rounded-b-2xl hover:bg-gray-100 hover:shadow-lg">
                            <div className="lds-ellipsis rotate-90"><div></div><div></div><div></div><div></div></div>
                            <span className="flex-1 text-center">
                                Read more
                            </span>
                        </div>
                    </Link>}
            </div>
        )
    }
    return <div></div>
}