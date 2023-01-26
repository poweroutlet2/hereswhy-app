import { PrismaClient } from "@prisma/client";

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
    const list = await prisma.list.create({
        data: {
            user_id: user_id,
            name: name
        }
    })

    return list
}
