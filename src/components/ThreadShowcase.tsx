import type { ThreadType } from "./Thread";
import Thread from "./Thread";



export default function ThreadShowcase({ threads }: { threads: ThreadType[] }): JSX.Element {


    return (
        <div className="showcase flex">
            <div className="lg:columns-2 3xl:columns-3 pt-5">
                {
                    threads.map((thread, index) => {
                        // randomly choose number of expanded tweets
                        let numExpanded = Math.floor(Math.random() * (4)) + 1;
                        if (index % 3 == 0) {
                            numExpanded = Math.floor(Math.random() * (2)) + 1;
                        }

                        return <Thread thread={thread} numExpanded={numExpanded} key={thread.id.toString()} />
                    })
                }
            </div>
        </div >
    )

}