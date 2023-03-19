import TweetSkelly from "./TweetSkelly"
import { Thread, ThreadType } from "./Thread";

export default function ThreadMarquee({ threads }: { threads: ThreadType[] }) {
    return (
        <>
            <div className="flex overflow-x-auto w-screen pb-16 px-2 scrollbar-hide">
                {(threads != undefined)
                    ?
                    threads.map((thread) => {
                        return (
                            <div className="lg:min-w-fit max-h-96" key={thread.id.toString()}>
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