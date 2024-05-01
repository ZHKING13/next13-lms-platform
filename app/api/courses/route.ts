import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function POST(
  req: Request,
) {
  try {
    const { userId } =await auth();
    console.log(userId)
     
    const data = await req.json();
const { title } = data.body
    if (!userId || !isTeacher(userId)) {
      console.log("not admin"+ await req.json())
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error,await req.json());
    return new NextResponse("Internal Error", { status: 500 });
  }
}