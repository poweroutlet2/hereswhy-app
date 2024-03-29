import type { author, media, tweet } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import md from 'markdown-it';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MediaContainer from "./MediaContainer";
import { SaveButton } from "./SaveButton";
import { SaveButtonDisabled } from "./SaveButtonDisabled";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ChartBarIcon } from "@heroicons/react/20/solid";


dayjs.extend(relativeTime)

function dateFormatter(dateString: string) {
    // formats the tweeted at datetime
    const date = dayjs(dateString)
    if (date > dayjs().subtract(1, 'day'))
        return date.fromNow()
    return date.format('MM/DD/YYYY')
}


function numberFormatter(num: number | null | undefined): string {
    // formats the like, repy, and retweet counts

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

function renderAtMentions(text: string) {
    return text.replace(/@([a-z\d_]+)/ig, '<a href="http://twitter.com/$1" class="mention">@$1</a>');
}

export function renderTweetText(text: string, links: string[]) {
    // renders links and at mentions from tweet text
    let result = md().render(text)
    result = renderAtMentions(result)
    links.forEach((link, index) => {
        if (index % 2 == 0) {
            const next = links[index + 1]
            if (next) {
                result = result.replace(link, `<a href="${next}" class="external-link">${link}</a>`)
            }
        }
    })

    return result
}


export function HeaderTweet(
    { thread_id, tweeted_at, tweet, author, replies, likes, retweets, media, views }:
        { thread_id: bigint, tweeted_at: Date | null, tweet: tweet, author: author, media?: media[], replies: number | null, likes: number | null, retweets: number | null, views: number | null }): JSX.Element {

    const { data: session, status } = useSession()
    const [date, setDate] = useState('')
    useEffect(() => {
        if (tweeted_at) {
            setDate(tweeted_at?.toLocaleString())
        }
    }, [tweeted_at])
    
    if (tweet?.content) {
        return (
            <article className={`tweet-card relative my-0 py-5 px-4 overflow-clip rounded-t-2xl`}>
                <div className={`absolute top-0 left-0 w-[4px] h-full ml-[56px] mt-8 bg-gray-200 dark:bg-gray-700 bg-opacity-80`}></div>
                <div className='flex items-start'>
                    <div className="profile-pic relative">
                        <Link href={`/authors/${author.id}`}>
                            <Image className='rounded-full h-20 w-20 mr-2 hover:brightness-90 border-4 border-gray-200 dark:border-gray-700' src={author.profile_picture_url || ""} alt={`profile picture for @${author.username}`} height={400} width={400} unoptimized={true} />
                        </Link>
                    </div>
                    <div className="flex-auto w-2/3 text-base md:text-xl">
                        <div className="flex flex-col relative md:flex-row">
                            <div>
                                <Link href={`/authors/${author.id}`} className='font-semibold break-all hover:underline'>
                                    {author.display_name}
                                </Link>
                            </div>
                            {/* tweeted at date */}
                            <span className="text-3xl hidden md:inline-block -mt-3 mx-1 opacity-70">.</span>
                            <span className='text-xs md:text-sm md:mt-1 opacity-40 '>
                                {dateFormatter(date)}
                            </span>
                            <div className="absolute -top-2 right-4 w-10 -mr-1">
                                {(session?.user && status == 'authenticated') ?
                                    <SaveButton thread_id={thread_id} user_id={session.user.id} />
                                    :
                                    <SaveButtonDisabled />
                                }
                            </div>
                        </div>
                        <Link href={`https://twitter.com/${author.username}`} target="_blank" rel="noopener noreferrer" className='gap-1 opacity-50 hover:opacity-100 hover:text-blue-500'>
                            @{author.username}
                        </Link>
                        <div className="tweet-text text-base md:text-lg mt-1" dangerouslySetInnerHTML={{ __html: renderTweetText(tweet.content, tweet.links) }} />
                        {media?.length != 0 ? <MediaContainer media={media} alt={tweet.content.substring(0, 100)} /> : ''}

                        {/* Metric buttons - only show if replies exists (is first tweet) */}
                        <div className="flex flex-row justify-center mt-4 -mb-2 gap-4 text-xs md:text-sm md:gap-6 font-medium tracking-wider md:flex">
                            <div className="flex group gap-1 items-center" title="Replies">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-1 fill-blue-500">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                </svg>
                                <div className="flex flex-col">
                                    <span className="mb-1 flex gap-1">
                                        {numberFormatter(replies)}
                                        <span className="hidden">replies</span>
                                    </span>
                                </div>
                            </div>
                            <div className="flex group gap-1 items-center" title="Retweets">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-1 fill-green-400 stroke-green-400">
                                    <g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z" />
                                    </g>
                                </svg>
                                <div className="flex flex-col">
                                    <span className="mb-1 flex">
                                        {numberFormatter(retweets)}
                                        <span className="hidden">Retweets</span>
                                    </span>
                                </div>
                            </div>
                            <div className="flex group gap-1 items-center" title="Likes">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-1 fill-red-500">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                                <div className="flex flex-col">
                                    <span className="mb-1 flex gap-1">
                                        {numberFormatter(likes)}
                                        <span className="hidden">Likes</span>
                                    </span>
                                </div>
                            </div>
                            <div className="flex group gap-1 items-center" title="Views">
                                <ChartBarIcon className="w-6 h-6 mb-1 fill-blue-500" />
                                <div className="flex flex-col">
                                    <span className="mb-1 flex gap-1">
                                        {numberFormatter(views)}
                                        <span className="hidden">Views</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* Twitter bird icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-2 scale-125">
                            <Link className="fill-blue-500 hover:opacity-80" href={`https://twitter.com/threadsapp/status/${tweet.id.toString()}`} passHref target="_blank" rel="noopener noreferrer">
                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                            </Link>
                        </svg>
                    </div>
                </div>
            </article >
        )
    }
    return <div></div>
}

