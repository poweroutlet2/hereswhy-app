import type { media } from "@prisma/client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";

export default function MediaContainer({ media }: { media: media[] | undefined }) {
    // these are required for Lightbox component
    const [open, setOpen] = useState(-1) // contains the index of image to open
    const slides = media?.map((media_component) => ({ src: media_component.url }))

    return (
        <>
            <div className="grid grid-flow-col place-items-center bg-gray-200 gap-1 gap mt-2 w-full max-h-full rounded-3xl overflow-hidden border-4 border-gray-200">
                {media &&
                    media.map((media_component, index) => {
                        if (media_component.url) {
                            return (
                                <div key={media_component.id} className="flex justify-center h-full w-full hover:brightness-75 hover:cursor-pointer" onClick={() => setOpen(index)}>
                                    <Image
                                        src={media_component.url}
                                        alt="tweet_media"
                                        width={300}
                                        height={100}
                                        className=""
                                    />
                                </div>
                            )
                        }
                    })
                }
            </div>

            <Lightbox
                open={open >= 0}
                close={() => setOpen(-1)}
                index={open}
                slides={slides}
                render={{
                    slide: (image) => {
                        return (
                            <div style={{ position: "relative" }}>
                                <Image
                                    src={image.src}
                                    loading="eager"
                                    alt={"tweet_media"}
                                    width={700}
                                    height={1000}
                                />
                            </div>
                        );
                    }
                }}
            />
        </>
    )
}

