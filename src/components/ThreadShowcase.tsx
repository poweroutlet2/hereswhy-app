import type { ThreadType } from "./Thread";
import { Thread } from "./Thread";


export default function ThreadShowcase({ threads }: { threads: ThreadType[] }): JSX.Element {

    return (
        <div className="showcase flex">
            <div className="xl:columns-2 3xl:columns-3 pt-5 pb-5">
                {
                    threads &&
                    threads.map((thread) => {
                        //return <ThreadTest thread={thread} key={thread.id.toString()} />
                        return (
                            <Thread thread={thread} fullyExpanded={false} key={thread.id.toString()} />
                        )
                    })
                }
            </div>
        </div >
    )

}