import { db } from "@/lib/db";

export const getUser =async (userId: string) => {
    const user = await db.user.findUnique({
        where: {
            userId: userId
        }
    });
    return user;
}