import type { media } from "@prisma/client";
import Image from "next/image";

export default function MediaContainer({ media }: { media: media[] | undefined }) {
    return (
        <div className="grid grid-flow-col place-items-center bg-gray-200 gap-1 gap mt-2 w-full max-h-full rounded-3xl overflow-hidden border-4 border-gray-200">
            {media &&
                media.map((media_component) => {
                    if (media_component.url) {
                        return (
                            <div key={media_component.id} className="flex justify-center h-full w-full hover:brightness-75 hover:cursor-pointer">
                                <Image src={media_component.url} alt="tweet_media" width={300} height={100} className="" />
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}

