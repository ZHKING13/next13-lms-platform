import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function POST(req: Request) {
    try {
        // const { userId } = await auth();
        // console.log(userId);

        // if (!userId || !isTeacher(userId)) {
        //     return new NextResponse("Unauthorized", { status: 401 });
        // }

        const data = await req.json();
        console.log(data.title);
        const { title } = data;
        console.log(title);

        const course = await db.course.create({
            data: {
                userId: "userId",
                title,
            },
        });

        return NextResponse.json(course);
    } catch (error) {
        console.log("[COURSES]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
