import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ArrowRight, File } from "lucide-react";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { ArrowLeft, Eye, LayoutDashboard } from "lucide-react";
import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";
import Video from "./_components/Videos";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ChapterIdPage = async ({
    params,
}: {
    params: { courseId: string; chapterId: string };
}) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const {
        chapter,
        course,
        muxData,
        attachments,
        nextChapter,
        userProgress,
        purchase,
    } = await getChapter({
        userId,
        chapterId: params.chapterId,
        courseId: params.courseId,
    });

    if (!chapter || !course) {
        return redirect("/");
    }
console.log(nextChapter);
    const isLocked = !chapter.isFree && !purchase;
    const completeOnEnd = !!purchase && !userProgress?.isCompleted;

    return (
        <div>
            <div className="flex  flex-col w-full h-full mx-auto ">
                <Link
                    href={`/dashboard`}
                    className="flex items-center mt-2 rounded-xl p-3 bg-primary text-white w-[100px] ml-4 text-sm hover:opacity-75 transition mb-6"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour
                </Link>
                <div className="px-4">
                    <Video src={chapter?.videoUrl || ""} />
                    {/* <VideoPlayer
                        chapterId={params.chapterId}
                        title={chapter.title}
                        courseId={params.courseId}
                        nextChapterId={nextChapter?.id}
                        playbackId={muxData?.playbackId!}
                        isLocked={false}
                        completeOnEnd={completeOnEnd}
                    /> */}
                </div>
                <div>
                    {/* <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                        <h2 className="text-2xl font-semibold mb-2">
                            {chapter.title}
                        </h2>
                        <CourseProgressButton
                            chapterId={params.chapterId}
                            courseId={params.courseId}
                            nextChapterId={nextChapter?.id}
                            isCompleted={!!userProgress?.isCompleted}
                            userId={userId}
                        />
                    </div> */}
                    {/* bouton pour cours suivants */}
                    <div className="flex justify-around">
                        {/* <Link
                            href={`/dashboard`}
                            className="flex items-center mt-2 rounded-xl p-3 bg-primary text-white w-[100px] ml-4 text-sm hover:opacity-75 transition mb-6"
                        >
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Precedent
                        </Link> */}
                        <div></div>
                        <Link
                            href={`/courses/${params.courseId}/chapters/${nextChapter?.id}`}
                            className="flex items-center mt-2 rounded-xl p-3 bg-primary text-white w-[100px] ml-4 text-sm hover:opacity-75 transition mb-6"
                        >
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Suivant
                        </Link>
                    </div>
                    {!!attachments.length && (
                        <>
                            <Separator />
                            <div className="p-4">
                                {attachments.map((attachment) => (
                                    <a
                                        href={attachment.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        key={attachment.id}
                                        className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                                    >
                                        <File className="mr-2" />
                                        <p className="line-clamp-1">
                                            {attachment.name}
                                        </p>
                                    </a>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChapterIdPage;
