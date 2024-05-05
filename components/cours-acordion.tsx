import React, { useRef, useEffect } from "react";
import { redirect } from "next/navigation";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Preview } from "./preview";
import PjAcordion from "./pj-acordion";
import Link from "next/link";
import { Badge } from "./ui/badge";

export function AccordionCours({
    item,
    coursId,
    img,
}: {
    item: any;
    coursId: any;
    img: string;
}) {
    const handleVideoClick = () => {
        // Rediriger l'utilisateur vers une autre page
        redirect(`/dashboard/courses/${coursId}`);
    };

    const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
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

    return (
        <div className="sm:px-5 p-2 ">
            <Accordion type="single" collapsible className="w-full">
                {item.map((chapter: any) => (
                    <AccordionItem key={chapter.id} value={chapter.id}>
                        <AccordionTrigger>{chapter.title}</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex max-w-[300px]  md:max-w-[640px] justify-between bg-primary gap-5 p-2 sm:p1 flex-col md:flex-row">
                                <div className="md:w-2/5 card d aspect-video md:h-auto w-auto h-auto">
                                    {chapter.videoUrl && (
                                        <Link
                                            className="w-full"
                                            href={`/courses/${coursId}`}
                                        >
                                            <video
                                                className=" w-ful h-full"
                                                src={chapter.videoUrl}
                                                ref={(el) =>
                                                    (videoRefs.current[
                                                        chapter.id
                                                    ] = el)
                                                }
                                                onClick={handleVideoClick}
                                            />
                                        </Link>
                                    )}
                                </div>

                                <div className="card text-white md:w-3/5 w-full p-1 md:p-3 ">
                                    <Badge className="ml-2" variant="destructive">Léçon :{chapter.position} </Badge>

                                    <h1 className="md:text-xl md:p-2 text-start text-lg ">
                                        {chapter.title}
                                    </h1>
                                    <Preview value={chapter.description} />
                                    <div className=" w-full ">
                                        {/* <PjAcordion /> */}
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
