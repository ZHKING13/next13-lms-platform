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
interface CourseCardProps {
    id: string;
    title: string;
    imageUrl: string;
    chaptersLength: number;
    price: number;
    progress: number | null;
    category: string;
}

export const CourseCard = ({
    id,
    title,
    imageUrl,
    chaptersLength,
    price,
    progress,
    category,
}: CourseCardProps) => {
    return (
        // href={`/courses/${id}`}
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <div>
                        <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
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
                <DialogContent className="sm:max-w-[525px] text-white p-5">
                    <DialogHeader>
                        <div
                            className="bg-[imageUrl] flex justify-end w-full aspect-video bg-no-repeat md:bg-cover object-contain bg-cover bg-center"
                            style={{ backgroundImage: `url(${imageUrl})` }}
                        >
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Fermer
                                </Button>
                            </DialogClose>
                        </div>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 text-white">
                        <div className="">
                            <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                                {title}
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Sapiente praesentium est
                                officia! Maxime quia esse reiciendis error
                                autem, quisquam quae exercitationem doloremque
                                cupiditate alias quaerat consectetur? Qui, odio
                                nostrum? Voluptates.
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
