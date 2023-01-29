import type { author, media, tweet } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import md from 'markdown-it';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MediaContainer from "./MediaContainer";


dayjs.extend(relativeTime)

function renderAtMentions(text: string) {
    return text.replace(/@([a-z\d_]+)/ig, '<a href="http://twitter.com/$1" class="mention">@$1</a>');
}

function renderTweetText(text: string) {
    // renders links and at mentions from tweet text
    let result = md().render(text)
    result = renderAtMentions(result)

    return result
}

export function Tweet(
    { tweet, author, last, media }:
        { tweet: tweet, author: author, media?: media[], last?: boolean }): JSX.Element {
    // tweet.content = linkFormatter(tweet.content)
    const author_external_url = `https://twitter.com/${author.username}`
    const author_internal_url = `/authors/${author.id}`

    if (tweet?.content) {
        return (
            <article className={`tweet-card relative max-w-xl md:max-w-2xl my-0 py-5 px-4 overflow-clip sm:hover:bg-gray-50 duration-50 ${last ? "rounded-b-2xl" : ""}`}>
                <div className={`absolute top-0 left-0 w-[4px] h-full ml-[56px] ${last ? "h-1/3" : ""} bg-gray-200 bg-opacity-80`}></div>
                <div className='flex items-start'>
                    <div className="profile-pic relative">
                        <Link href={author_external_url} passHref target="_blank" rel="noopener noreferrer">
                            <Image className='rounded-full h-20 w-20 mr-2 hover:brightness-90 border-4 border-gray-200' src={author.profile_picture_url || ""} alt="author profile pic" height={400} width={400} unoptimized={true} />
                        </Link>
                    </div>
                    <div className="flex-auto w-2/3 text-base md:text-xl">
                        <div className="flex flex-col md:flex-row">
                            <Link href={author_internal_url} className='font-semibold break-all hover:underline'>
                                {author.display_name}
                            </Link>
                        </div>
                        <Link href={author_external_url} target="_blank" rel="noopener noreferrer" className='gap-1 opacity-50 hover:opacity-100 duration-100 hover:text-blue-500'>
                            @{author.username}
                        </Link>
                        {/* <div className='text-lg mb-3 mt-1 leading-normal'>
                            {tweet.content}
                        </div> */}
                        <div className="tweet-text text-base md:text-lg" dangerouslySetInnerHTML={{ __html: renderTweetText(tweet.content) }} />
                        {media?.length != 0 ? <MediaContainer media={media} /> : ''}
                    </div>
                    <div>
                        {/* Twitter bird icon */}
                        <Link href={`https://twitter.com/threadsapp/status/${tweet.id.toString()}`} passHref target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 hover:stroke-blue-500 hover:scale-125 stroke-1 fill-blue-500 duration-75">
                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                            </svg>
                        </Link>
                    </div>
                </div>

            </article >
        )
    }
    return <div></div>
}

