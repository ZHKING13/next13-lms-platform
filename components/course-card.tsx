"use client"
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Preview } from "./preview";
import PjAcordion from "./pj-acordion";
import { Badge } from "./ui/badge";
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
    coursDesc?: string;
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
    coursDesc,
}: CourseCardProps) => {
    console.log("itemmmmmm:::::" + coursId);
      const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
      const [videoDurations, setVideoDurations] = useState<{
          [key: string]: number;
      }>({});
      useEffect(() => {
          // Fonction pour récupérer la durée de chaque vidéo
          const getVideoDuration = (chapterId: string) => {
              const video = videoRefs.current[chapterId];
              // Assurez-vous que la vidéo est chargée avant d'obtenir la durée
              if (video && video.readyState >= 2) {
                  console.log(
                      "La vidéo est chargée. Durée de la vidéo:",
                      video.duration,
                      "secondes"
                  );
              } else {
                  console.log("La vidéo n'est pas encore chargée.");
              }
          };

          // Ajouter des écouteurs pour détecter le chargement des métadonnées de chaque vidéo
          Object.keys(videoRefs.current).forEach((chapterId) => {
              const video = videoRefs.current[chapterId];
              if (video) {
                  // Vérifier si video existe
                  video.addEventListener("loadedmetadata", () => {
                      getVideoDuration(chapterId);
                  });
              }
          });

          // Nettoyer les écouteurs lorsque le composant est démonté
          return () => {
              Object.keys(videoRefs.current).forEach((chapterId) => {
                  const video = videoRefs.current[chapterId];
                  if (video) {
                      // Vérifier si video existe
                      video.removeEventListener("loadedmetadata", () => {
                          getVideoDuration(chapterId);
                      });
                  }
              });
          };
      }, [item]); // S'exécute chaque fois que item change
      const formatDuration = (durationInSeconds: number): string => {
          if (durationInSeconds < 60) {
              return `${durationInSeconds} secondes`;
          } else if (durationInSeconds < 3600) {
              const minutes = Math.floor(durationInSeconds / 60);
              const seconds = durationInSeconds % 60;
              return `${minutes} min ${Math.floor(seconds)} sec
        `;
          } else {
              const hours = Math.floor(durationInSeconds / 3600);
              const remainingSeconds = durationInSeconds % 3600;
              const minutes = Math.floor(remainingSeconds / 60);
              const seconds = remainingSeconds % 60;
              return `${hours} h ${minutes} min
         ${seconds} sec`;
          }
      };
    return (
        // href={`/courses/${id}`}
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="transform hover:scale-340 transition-transform ">
                        <div className="group hover:shadow-sm  overflow-hidden border rounded-lg p-3 h-full">
                            <div className="relative w-full aspect-video rounded-md overflow-hidden">
                                <img
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
                <DialogContent
                    // style={{ backgroundImage: `url(${imageUrl})` }}
                    className="sm:max-w-[725px] bg-cover bg-center bg-no-repeat  overflow-auto max-h-[100%] scrollbar-hide text-white p-5"
                >
                    <div>
                        <DialogHeader>
                            <div className="flex justify-end w-full  ">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Fermer
                                    </Button>
                                </DialogClose>
                            </div>
                            {/* <div
                            style={{
                                backgroundImage: `${imageUrl}`,
                            }}
                            className="text-2xl h-10 bg-red-300 object-cover object-center bg-no-repeat  text-center font-medium group-hover:text-sky-700 transition line-clamp-2"
                        >
                            {title}
                            <p className="text-slay-200 text-lg">{coursDesc}</p>
                        </div> */}
                            <DialogDescription
                                className=" text-white bg-fill bg-center bg-no-repeat "
                                style={{ backgroundImage: `url(${imageUrl})` }}
                            >
                                <div className="bg-primary/80 p-5">
                                    <h1 className="text-3xl text-center mb-2">
                                        {title}
                                    </h1>
                                    <p className="text-lg">{coursDesc}</p>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                        <div className=" gap-4 py-4 text-white">
                            <div className="">
                                <div className="overflow-auto ">
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="w-full"
                                    >
                                        {item
                                            .slice() // Crée une copie du tableau pour ne pas modifier l'original
                                            .sort(
                                                (a: any, b: any) =>
                                                    a.position - b.position
                                            ) // Trie les éléments par ordre croissant de position
                                            .map((chapter: any) => (
                                                <AccordionItem
                                                    key={chapter.id}
                                                    value={chapter.id}
                                                >
                                                    <AccordionTrigger>
                                                        {chapter.title}
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        <div className="flex max-w-[300px]  md:max-w-[640px] justify-between bg-primary gap-5 p-2 sm:p1 flex-col md:flex-row">
                                                            <div className="md:w-2/5 card d aspect-video md:h-auto w-auto h-auto">
                                                                {chapter.videoUrl && (
                                                                    <Link
                                                                        className="w-full"
                                                                        href={`/courses/${coursId}/${chapter.id}`}
                                                                    >
                                                                        <video
                                                                            className=" w-ful h-full"
                                                                            src={
                                                                                chapter.videoUrl
                                                                            }
                                                                            ref={(
                                                                                el
                                                                            ) =>
                                                                                (videoRefs.current[
                                                                                    chapter.id
                                                                                ] =
                                                                                    el)
                                                                            }
                                                                            onLoadedMetadata={() => {
                                                                                const video =
                                                                                    videoRefs
                                                                                        .current[
                                                                                        chapter
                                                                                            .id
                                                                                    ];
                                                                                if (
                                                                                    video &&
                                                                                    video.readyState >=
                                                                                        2
                                                                                ) {
                                                                                    console.log(
                                                                                        "La vidéo est chargée. Durée de la vidéo:",
                                                                                        video.duration,
                                                                                        "secondes"
                                                                                    );
                                                                                    setVideoDurations(
                                                                                        (
                                                                                            prevDurations
                                                                                        ) => ({
                                                                                            ...prevDurations,
                                                                                            [chapter.id]:
                                                                                                video.duration,
                                                                                        })
                                                                                    );
                                                                                } else {
                                                                                    console.log(
                                                                                        "La vidéo n'est pas encore chargée."
                                                                                    );
                                                                                }
                                                                            }}
                                                                        />
                                                                    </Link>
                                                                )}
                                                            </div>

                                                            <div className="card  text-white md:w-3/5 w-full p-1 md:p-3 ">
                                                                <Badge className="ml-2 p-2 bg-[#7043EC]">
                                                                    Chapitre :{" "}
                                                                    {
                                                                        chapter.position
                                                                    }{" "}
                                                                </Badge>
                                                                <Badge
                                                                    className="ml-2 p-2 bg-[#7043EC]"
                                                                    
                                                                >
                                                                    Durée :{" "}
                                                                    {formatDuration(
                                                                        videoDurations[
                                                                            chapter
                                                                                ?.id
                                                                        ] || 0
                                                                    )}
                                                                </Badge>

                                                                
                                                                <Preview
                                                                    value={
                                                                        chapter.description
                                                                    }
                                                                />
                                                                <div className=" w-full "></div>
                                                            </div>
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                    </Accordion>

                                    {/* <AccordionCours coursId={coursId} item={item} /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
