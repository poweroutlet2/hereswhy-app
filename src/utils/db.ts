import { PrismaClient } from "@prisma/client";

// Take control of BigInt serialization by force >:) :
(BigInt.prototype as any).toJSON = function () {
    return this.toString();
}

const prisma = new PrismaClient({
    log: ['query'], // this will log sql to console
});

export async function db_get_top_threads_tweets(num_threads: number, period = 'today',) {
    /*
    Returns the @num_threads threads including tweets with the highest number of likes within @period.

    Returns: {
        thread & tweet[]
    }
    */

    // determine since date for query
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
    return top_threads
}
