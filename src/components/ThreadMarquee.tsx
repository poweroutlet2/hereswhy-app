import TweetSkelly from "./TweetSkelly"
import { Thread, ThreadType } from "./Thread";

export default function ThreadMarquee({ threads }: { threads: ThreadType[] }) {
    return (
        <>
            <div className="flex overflow-x-auto w-screen place-items-center ">
                {(threads != undefined)
                    ?
                    threads.map((thread) => {
                        return (
                            <div className="min-w-max">
                                <Thread thread={thread} fullyExpanded={false} />
                            </div>
                        )
                    })
                    :
                    <TweetSkelly />
                }
            </div>
        </>
    )
}