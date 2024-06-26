import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
   

   

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      }
    });

    const muxData = await db.muxData.findUnique({
      where: {
        chapterId: params.chapterId,
      }
    });

   

    const publishedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedChapter);
  } catch (error) {
    console.log("[CHAPTER_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}