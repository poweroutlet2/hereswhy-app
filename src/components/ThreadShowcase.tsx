import type { ThreadType } from "./Thread";
import { Thread } from "./Thread";



export function ThreadShowcase({ threads }: { threads: ThreadType[] }): JSX.Element {


    return (
        <div className="showcase flex justify-center">
            <div className="xl:columns-2 3xl:columns-3 gap-2 p-5">
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