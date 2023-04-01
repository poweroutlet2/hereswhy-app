import { Thread, ThreadType } from "./Thread";

export default function ThreadMarquee({ threads }: { threads: ThreadType[] }) {

    const thread_components = threads.map((thread) => {
        return (
            <div className="lg:min-w-fit max-h-96 banner-obj" key={thread.id.toString()}>
                <Thread thread={thread} fullyExpanded={false} />
            </div>
        )
    })
    return (
        <div className="flex relative banner">
            <div className="flex animate-marquee">
                {thread_components}
            </div>
            <div className="flex absolute top-0 animate-marquee2">
                {thread_components}
            </div>
            <div className="flex animate-marquee3">
                {thread_components}
            </div>
        </div>
    )
}