import { PrismaClient } from "@prisma/client";
import type { ThreadType } from "../components/Thread";
import dayjs from 'dayjs';

// Take control of BigInt serialization by force >:( :
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(BigInt.prototype as any).toJSON = function () {
    return this.toString();
}

const prisma = new PrismaClient({
    log: ['query'], // this will log sql to console
});

export async function db_get_threads_by_author(id: bigint | string): Promise<ThreadType[]> {
    /*
    Returns all threads with the specified author_id.
    Includes author, tweets, and tweet media.
    */
    const threads = await prisma.thread.findMany({
        where: {
            author_id: BigInt(id),
        },
        orderBy: {
            like_count: 'desc'
        },
        include: {
            tweet: {
                orderBy: {
                    tweeted_at: 'asc'
                },
                include: {
                    media: {}
                }
            },
            author: {}
        },
    })
    const threads_jsonified = JSON.parse(JSON.stringify(threads, (key, value) => (typeof value === 'bigint' ? value.toString() : value)))
    return threads_jsonified
}
export async function db_get_thread(id: bigint | string): Promise<ThreadType> {
    /*
    Returns the thread with the specified id.
    Includes author, tweets, and tweet media associated with the thread.

    */
    const thread = await prisma.thread.findFirst({
        where: {
            id: BigInt(id)
        },
        include: {
            author: {},
            tweet: {
                orderBy: {
                    created_at: 'asc'
                },
                include: {
                    media: {}
                }
            },
        }
    })

    const thread_jsonified = JSON.parse(JSON.stringify(thread, (key, value) => (typeof value === 'bigint' ? value.toString() : value)))
    return thread_jsonified
}

export async function db_get_threads(ids: bigint[] | string[]): Promise<ThreadType[]> {
    const bigintIds = ids.map((id) => BigInt(id))
    const thread = await prisma.thread.findMany({
        where: {
            id: {
                in: bigintIds
            }
        },
        include: {
            author: {},
            tweet: {
                orderBy: {
                    created_at: 'asc'
                },
                include: {
                    media: {}
                }
            },
        }
    })

    const thread_jsonified = JSON.parse(JSON.stringify(thread, (key, value) => (typeof value === 'bigint' ? value.toString() : value)))
    return thread_jsonified
}

export async function db_get_top_threads_tweets(num_threads: number, period = 'today',): Promise<ThreadType[]> {
    /*
    Returns the @num_threads threads including tweets with the highest number of likes within @period.
    */


    // TODO: this logic should live on frontend? This function should take in raw dates for period
    // determine since date for query
    let date = dayjs();
    let since = ''

    switch (period) {
        case 'day':
            date = date.subtract(1, 'day')
            break;
        case 'week':
            date = date.subtract(7, 'day')
            break;
        case 'month':
            date = date.subtract(1, 'month')
            break;
        case 'year':
            date = date.subtract(1, 'year')
            break;
        case 'alltime':
            date = date.subtract(10, 'year')
            break;
        default: // default to today
            date = date.subtract(1, 'day')
    }
    since = date.toISOString() //.format('YYYY-MM-DD')

    const threads = await prisma.thread.findMany({
        where: {
            tweeted_at: {
                gte: since
            },
            sensitive: false,
        },
        orderBy: {
            like_count: 'desc'
        },
        take: num_threads,
        include: {
            tweet: {
                orderBy: {
                    tweeted_at: 'asc'
                },
                include: {
                    media: {}
                }
            },
            author: {}
        },
    })
    const threads_jsonified = JSON.parse(JSON.stringify(threads, (key, value) => (typeof value === 'bigint' ? value.toString() : value)))
    return threads_jsonified
}


type ThreadSearchResults = {
    tweet_id: bigint
    thread_id: bigint
}

export async function search_threads(term: string) {
    const results: ThreadSearchResults[] = await prisma.$queryRaw`
        select thread_id, id as tweet_id,
            ts_rank(search, websearch_to_tsquery('english', ${term})) +
            ts_rank(search, websearch_to_tsquery('simple', ${term})) as rank
        from tweet 
        where search @@ websearch_to_tsquery('english', ${term}) or 
            search @@ websearch_to_tsquery('simple', ${term})
        order by rank desc
        LIMIT 100;
    `
    const thread_ids = results.map((search_result) => {
        return search_result.thread_id
    })

    const threads = db_get_threads(thread_ids)

    return threads
}