import type { author, tweet } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import md from 'markdown-it';

function numberFormatter(num: number | null | undefined): string {
    if (!num) {
        return ''
    }
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
}

function linkFormatter(text: string | null): string | null {
    const rxCommonMarkLink = /(\[([^\]]+)])\(([^)]+)\)/g;
    const anchor = text
        ? text.replace(rxCommonMarkLink, '<a href="$3"> $2 </a>')
        : text
        ;
    return anchor
}

export function Tweet({ tweet, author, replies, likes, retweets, last }: { tweet: tweet, author: author, replies?: number | null, likes?: number | null, retweets?: number | null, last?: boolean }): JSX.Element {
    // tweet.content = linkFormatter(tweet.content)
    const author_external_url = `https://twitter.com/${author.username}`
    const author_internal_url = `/authors/${author.id}`
    if (tweet?.content) {
        return (
            <article className={`tweet-card relative max-w-xl md:max-w-2xl my-0 p-5 hover:bg-slate-700 hover:bg-opacity-30 duration-500 border-neutral-800 ${replies ? "rounded-t-lg" : ""} ${last ? "rounded-b-lg" : ""}`}>
                <div className={`absolute top-0 left-0 w-[1.5px] h-full ml-[44px] ${replies ? "mt-8" : ""} ${last ? "h-1/3" : ""} bg-slate-800 bg-opacity-80`}></div>
                <div className='flex items-start'>
                    <div className="profile-pic relative">
                        <Link href={author_external_url} target="_blank" rel="noopener noreferrer">
                            <Image className='rounded-full h-12 w-12 mr-6 hover:opacity-80 border-2 border-slate-800' src={author.profile_picture_url || ""} alt="author profile pic" height={400} width={400} unoptimized={true} />
                        </Link>
                    </div>
                    <div className="flex-auto w-2/3 lg:w-full text-base md:text-xl">
                        <div className="flex flex-col md:flex-row">
                            <Link href={author_internal_url} className='font-semibold break-all hover:underline'>
                                {author.display_name}
                            </Link>
                            <span className="text-3xl hidden md:inline-block -mt-3 mx-2 opacity-90">
                                .
                            </span>
                            {replies &&
                                <span className='text-xs md:text-sm opacity-40 hover:opacity-70 duration-300 mt-1'>
                                    {tweet.tweeted_at?.toLocaleString().replace(',', '')}
                                </span>
                            }
                        </div>
                        <Link href={author_external_url} target="_blank" rel="noopener noreferrer" className='gap-1 opacity-50 hover:opacity-100 duration-300 hover:text-blue-500'>
                            @{author.username}
                        </Link>
                        {/* <div className='text-lg mb-3 mt-1 leading-normal'>
                            {tweet.content}
                        </div> */}
                        <div className="tweet-content text-base md:text-lg" dangerouslySetInnerHTML={{ __html: md().render(tweet.content) }} />

                        {/* Metric buttons - only show if replies exists (is first tweet) */}
                        {replies &&
                            <div className="flex flex-row justify-center mt-4 -mb-2 gap-8 text-sm font-medium tracking-wider md:flex">
                                <a className="flex text-base group gap-1 items-center" href={`https://twitter.com/intent/tweet?in_reply_to=${tweet.id.toString()}`} target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-1 fill-transparent stroke-white stroke-2 group-hover:fill-blue-500 duration-200">
                                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                    </svg>
                                    <div className="flex flex-col">
                                        <span className="mb-1 flex gap-1">
                                            {numberFormatter(replies)}
                                            <span className="hidden md:block">Replies</span>
                                        </span>
                                    </div>
                                </a>
                                <a className="flex text-base group gap-1 items-center" href={`https://twitter.com/intent/retweet?tweet_id=${tweet.id.toString()}`} target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-1 fill-current group-hover:fill-green-400 group-hover:stroke-green-400 duration-200">
                                        <g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z" />
                                        </g>
                                    </svg>
                                    <div className="flex flex-col">
                                        <span className="mb-1 flex gap-1">
                                            {numberFormatter(retweets)}
                                            <span className="hidden md:block">Retweets</span>
                                        </span>
                                    </div>
                                </a>
                                <a className="flex text-base group gap-1 items-center" href={`https://twitter.com/intent/like?tweet_id=${tweet.id.toString()}`} target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-1 fill-transparent stroke-2 group-hover:fill-red-500 stroke-white duration-200">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                    </svg>
                                    <div className="flex flex-col">
                                        <span className="mb-1 flex gap-1">
                                            {numberFormatter(likes)}
                                            <span className="hidden md:block">Likes</span>
                                        </span>
                                    </div>
                                </a>
                            </div>
                        }
                    </div>
                    {/* Twitter bird icon */}
                    <Link href={`https://twitter.com/threadsapp/status/${tweet.id.toString()}`} className="justify-self-end" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 fill-white stroke-white stroke-2 hover:fill-blue-500 duration-300">
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                        </svg>
                    </Link>
                </div>
            </article >
        )
    }
    return <div></div>
}
