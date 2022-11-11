import type { tweet } from "@prisma/client"
import Image from "next/image"


export function Tweet({ tweet }: { tweet: tweet }): JSX.Element {
    if (tweet) {
        return (
            <div className="tweet m-auto mx-10" >
                <div className="bg-white/[10%] backdrop-blur-md backdrop-saturate-150 backdrop-brightness-150 border-b border-white/[10%] rounded-2xl duration-300 my-8 p-5 not-prose max-w-2xl mx-auto tweetcard">
                    <div className='flex justify-between'>
                        <a className='flex items-center gap-3 group' href={`https://twitter.com/elonmusk/status/${tweet.id.toString()}`}>
                            <Image className='rounded-full h-12 w-12' src="https://pbs.twimg.com/profile_images/1256841238298292232/ycqwaMI2_400x400.jpg" alt="author profile pic" height={400} width={400} unoptimized={true} />
                            <div className='flex flex-col leading-snug'>
                                <span className='text-sm font-semibold flex gap-2'>
                                    Author
                                    <span className='text-sm font-normal opacity-70 group-hover:opacity-100 duration-300'>@author</span>
                                </span>
                                <span className='text-sm opacity-80 group-hover:opacity-100 duration-300'>Tweeted at</span>
                            </div>
                        </a>
                        {/* Twitter bird icon */}
                        <a href={`https://twitter.com/threadsapp/status/${tweet.id.toString()}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="fill-white stroke-1 hover:fill-blue-500 duration-300">
                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                            </svg>
                        </a>
                    </div>
                    <div className='text-lg my-3 leading-normal'>
                        {tweet.content}
                    </div>
                    <div className="flex flex-col items-center mb-3"></div>

                    {/* These buttons and numbers only go on the top level tweet */}
                    <div className="flex mt-2 gap-8 text-sm font-medium tracking-wider">
                        <a className="flex group gap-2 items-center" href={`https://twitter.com/intent/tweet?in_reply_to=${tweet.id.toString()}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 mb-1 fill-transparent group-hover:fill-blue-500 duration-300">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                            </svg> 280 Replies
                        </a>
                        <a className="flex group gap-2 items-center" href={`https://twitter.com/intent/retweet?tweet_id=${tweet.id.toString()}`}>
                            <svg className=" w-5 h-5 mb-1 group-hover:fill-green-400 duration-300" viewBox="0 0 24 24" aria-hidden="true">
                                <g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z" />
                                </g>
                            </svg>
                            6.2K Retweets
                        </a>
                        <a className="flex group gap-2 items-center" href={`https://twitter.com/intent/like?tweet_id=${tweet.id.toString()}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 mb-1 fill-transparent group-hover:fill-red-500 duration-300">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            33.0K Likes
                        </a>
                    </div>
                </div>
            </div >
        )
    }
    return <div></div>
}
