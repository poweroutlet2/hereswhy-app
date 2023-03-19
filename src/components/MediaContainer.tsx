import type { media } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

export default function MediaContainer({ media }: { media: media[] | undefined }) {
    /*
     media.type can be [
            'animated_gif',
            'photo',
            'video',
     ]
    */
    // these are required for Lightbox component
    const [open, setOpen] = useState(-1) // contains the index of image to open
    const slides = media?.map((media_component) => {
        if (media_component.type == 'video' || media_component.type == 'gif') {
            return ({
                type: media_component.type,
                width: 1280,
                height: 720,
                sources: [
                    {
                        src: media_component.url,
                        type: "video/mp4"
                    }
                ]
            })
        } else {
            return ({ src: media_component.url, type: media_component.type })
        }
    })
    return (
        <>
            <div className="grid grid-flow-col place-items-center bg-gray-200 dark:bg-slate-900 gap-1 gap mt-2 w-full max-h-full rounded-3xl overflow-hidden border-4 border-gray-200 dark:border-slate-700">
                {media &&
                    media.map((media_component, index) => {
                        const is_gif = media_component.type == 'gif'

                        if (media_component.url) {
                            return (<div key={media_component.id}>
                                {media_component.type == 'video' || media_component.type == 'gif' ?
                                    <>
                                        <div className="video relative">
                                            <video
                                                className="relative"
                                                width={is_gif ? "300" : "300"}
                                                height={is_gif ? "300" : "300"}
                                                disablePictureInPicture
                                                muted
                                                controls={!is_gif}
                                                autoPlay={is_gif}
                                                loop={is_gif}
                                            >
                                                <source src={media_component.url}
                                                    type="application/x-mpegURL" />
                                                <source src={media_component.url}
                                                    type="video/mp4" />
                                            </video>
                                            <button className="absolute bottom-[22px] left-[201px] w-14 h-14 hover:rounded-full hover:opacity-40 hover:bg-black" onClick={() => setOpen(index)}
                                            ></button>
                                        </div>
                                    </>
                                    : <>
                                        <div className="flex justify-center h-full w-full hover:brightness-75 hover:cursor-pointer" onClick={() => setOpen(index)}>
                                            <Image
                                                src={media_component.url}
                                                alt="tweet_media"
                                                width={250}
                                                height={100}
                                                className="h-auto w-auto"
                                            />
                                        </div>
                                    </>}
                            </div>)
                        }
                    })
                }
            </div>

            <Lightbox
                open={open >= 0}
                close={() => setOpen(-1)}
                index={open}
                // @ts-ignore
                slides={slides}
                render={{
                    slide: (image) => {
                        return (
                            <div style={{ position: "relative" }}>
                                <Image
                                    // @ts-ignore
                                    src={image.src}
                                    loading="eager"
                                    alt={"tweet_media"}
                                    width={800}
                                    height={600}
                                />
                            </div>
                        );
                    }
                }}
                carousel={{ finite: true }}
                styles={{ container: { backgroundColor: "rgba(0, 0, 0, .95)" } }}
                plugins={[Video, Zoom]}
            />
        </>
    )
}

