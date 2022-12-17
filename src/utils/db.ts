import { PrismaClient } from "@prisma/client";
import type { ThreadType } from "../components/Thread";

// Take control of BigInt serialization by force >:) :
(BigInt.prototype as any).toJSON = function () {
    return this.toString();
}

const prisma = new PrismaClient({
    log: ['query'], // this will log sql to console
});

export async function db_get_threads_by_author(id: bigint | string) {
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

    return threads
}

export async function db_get_thread(id: bigint | string) {
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

    return thread
}

export async function db_get_top_threads(num_threads: number, period = 'today',): Promise<ThreadType[]> {
    /*
    Returns the @num_threads threads including tweets with the highest number of likes within @period.
    
    */

    // determine since date for query
    // TODO: this logic should live on the frontend? This function should take in raw dates for period
    const date = new Date();
    let since = ''

    switch (period) {
        case 'today':
            date.setDate(date.getDate() - 1)
            since = date.toISOString()
            break;
        case 'week':
            date.setDate(date.getDate() - 7)
            since = date.toISOString();
            break;
        case 'month':
            date.setDate(date.getDate() - 30)
            since = date.toISOString();
            break;
        case 'year':
            date.setDate(date.getDate() - 365)
            since = date.toISOString();
            break;
        case 'alltime':
            date.setDate(date.getDate() - 36500) // will have to update this in year 3006 :3
            since = date.toISOString();
            break;
        default: // default to today
            date.setDate(date.getDate() - 1)
            since = date.toISOString()
    }

    const top_threads = await prisma.thread.findMany({
        where: {
            created_at: {
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
    const threads_jsonified = JSON.parse(JSON.stringify(top_threads, (key, value) => (typeof value === 'bigint' ? value.toString() : value)))
    return threads_jsonified
}
