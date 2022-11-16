import type { author, tweet } from "@prisma/client"
import Image from "next/image"


export function Tweet({ tweet }: { tweet: tweet }): JSX.Element {
    if (tweet) {
        return (
            <div className="tweet m-auto mx-10" >
                <div className="bg-white/[10%] backdrop-blur-md backdrop-saturate-150 backdrop-brightness-150 border-b border-white/[10%] rounded-2xl duration-300 my-8 p-5 not-prose max-w-2xl mx-auto tweetcard">
                    <div className='flex justify-end'>
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
                </div>
            </div >
        )
    }
    return <div></div>
}
