import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Preview } from "./preview";
import PjAcordion from "./pj-acordion";
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
    return (
        <div className="sm:px-5 p-2 ">
            <Accordion type="single" collapsible className="w-full">
                {item.map((chapter: any) => (
                    <AccordionItem key={chapter.id} value={chapter.id}>
                        <AccordionTrigger>{chapter.title}</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex max-w-sm  md:max-w-[640px] justify-between bg-primary gap-5 p-2 sm:p1 flex-col md:flex-row">
                                <div className="md:w-2/5 card d aspect-video md:h-auto w-auto h-auto">
                                    {chapter.videoUrl && (
                                        <video
                                            className="w-full h-full"
                                            src={chapter.videoUrl}
                                            onClick={handleVideoClick}
                                        />

                                        // <img
                                        //     className="object-cover aspect-video w-full md:h-40 h-15 "
                                        //     alt="cours image"
                                        //     src={img}
                                        // />
                                    )}
                                </div>

                                <div className="card text-white md:w-3/5 w-full p-1 md:p-3 ">
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
