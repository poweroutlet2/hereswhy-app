import { threadId } from 'worker_threads';
/*
These are utils that require the user to be authed.
*/
import { PrismaClient } from "@prisma/client";
import { list } from 'postcss';

// Take control of BigInt serialization by force >:( :
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(BigInt.prototype as any).toJSON = function () {
    return this.toString();
}

const prisma = new PrismaClient({
    //log: ['query'], // this will log sql to console
});

export async function create_list(
    user_id: string,
    name: string
) {
    /*
    Creates a new list for a user with the specified name.
    */
    const list = await prisma.list.create({
        data: {
            user_id: user_id,
            name: name
        }
    })

    return list
}

export async function save_thread(
    thread_id: bigint | string,
    user_id?: string,
    list_id?: number | undefined
) {
    /*
    Saves a thread to a list. If a list is not provided, a default list wil be created for the given user.
    */
    if (!list_id && user_id) {
        // default list name to Read Later
        list_id = await create_list(user_id, "Read Later").then((list) => list.id)
    }
    let saved_thread;
    if (list_id) {
        saved_thread = await prisma.saved_thread.create({
            data: {
                list_id: list_id,
                thread_id: BigInt(thread_id)
            }
        })
    }
    return saved_thread
}

export async function unsave_thread(
    thread_id: bigint | string,
    list_id?: number | undefined
) {
    /*
    Saves a thread to a list. If a list is not provided, a default list wil be created for the given user.
    */
    let unsaved_thread;
    if (list_id && thread_id) {
        unsaved_thread = await prisma.saved_thread.delete({
            where: {
                list_id_thread_id: {
                    thread_id: BigInt(thread_id),
                    list_id: list_id
                }
            }
        })
    }

    return unsaved_thread
}