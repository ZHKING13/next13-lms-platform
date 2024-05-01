import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { AccordionCours } from "./cours-acordion";
interface CourseCardProps {
    id: string;
    title: string;
    imageUrl: string;
    chaptersLength: number;
    price: number;
    progress: number | null;
    category: string;
    item: any;
    coursId: any;
    coursDesc?:string;
}

export const CourseCard = ({
    id,
    title,
    imageUrl,
    chaptersLength,
    price,
    progress,
    category,
    item,
    coursId,
    coursDesc
}: CourseCardProps) => {
    console.log("itemmmmmm:::::" + coursId);
    return (
        // href={`/courses/${id}`}
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="transform hover:scale-340 transition-transform transition">
                        <div className="group hover:shadow-sm  overflow-hidden border rounded-lg p-3 h-full">
                            <div className="relative w-full aspect-video rounded-md overflow-hidden">
                                <Image
                                    fill
                                    className="object-cover "
                                    alt={title}
                                    src={imageUrl}
                                />
                            </div>
                            <div className="flex flex-col pt-2">
                                <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                                    {title}
                                </div>

                                {/* <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div> */}
                                {progress !== null ? (
                                    <CourseProgress
                                        variant={
                                            progress === 100
                                                ? "success"
                                                : "default"
                                        }
                                        size="sm"
                                        value={progress}
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[725px] overflow-auto max-h-[100%] scrollbar-hide text-white p-5">
                    <DialogHeader>
                        <div className="flex justify-end w-full  ">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Fermer
                                </Button>
                            </DialogClose>
                        </div>
                        <div className="text-2xl  text-center font-medium group-hover:text-sky-700 transition line-clamp-2">
                            {title}
                        </div>
                        <DialogDescription>
                            <p className="text-slay-200 text-lg">{coursDesc}</p>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="  gap-4 py-4 text-white">
                        <div className="">
                            <div className="overflow-auto ">
                                {item.map((chapter: any) => {
                                    return (
                                        <AccordionCours
                                            coursId={coursId}
                                            item={item}
                                            img={imageUrl}
                                            key={chapter?.id}
                                        />
                                    );
                                })}
                                {/* <AccordionCours coursId={coursId} item={item} /> */}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Quiz</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
