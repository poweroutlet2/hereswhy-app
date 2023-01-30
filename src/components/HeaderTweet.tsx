import type { author, media, tweet } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import md from 'markdown-it';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MediaContainer from "./MediaContainer";
import { SaveButton } from "./SaveButton";
import { SaveButtonDisabled } from "./SaveButtonDisabled";
import { useSession } from "next-auth/react";


dayjs.extend(relativeTime)

function dateFormatter(dateString: string) {
    // formats the tweeted at datetime
    const date = dayjs(dateString)
    if (date > dayjs().subtract(1, 'day'))
        return date.fromNow()
    return date.format('MM/DD/YYYY')
}


function numberFormatter(num: number | null | undefined): string {
    // formats the like, repy, and retweet counts

    if (!num) {
        return ''
    }
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
}

function linkFormatter(text: string | null): string | null {
    const rxCommonMarkLink = /(\[([^\]]+)])\(([^)]+)\)/g;
    const anchor = text
        ? text.replace(rxCommonMarkLink, '<a href="$3"> $2 </a>')
        : text
        ;
    return anchor
}

function renderAtMentions(text: string) {
    return text.replace(/@([a-z\d_]+)/ig, '<a href="http://twitter.com/$1" class="mention">@$1</a>');
}

function renderTweetText(text: string) {
    // renders links and at mentions from tweet text
    let result = md().render(text)
    result = renderAtMentions(result)

    return result
}


export function HeaderTweet(
    { thread_id, tweet, author, replies, likes, retweets, media }:
        { thread_id: bigint, tweet: tweet, author: author, media?: media[], replies: number | null, likes: number | null, retweets: number | null }): JSX.Element {
    const { data: session, status } = useSession()
    if (tweet?.content) {
        return (
            <article className={`tweet-card relative max-w-xl md:max-w-2xl my-0 py-5 px-4 overflow-clip sm:hover:bg-gray-50 duration-50 rounded-t-2xl`}>

            </article >
        )
    }
    return <div></div>
}

