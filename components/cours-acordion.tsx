import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { redirect } from "next/navigation";
import { Preview } from "./preview"
import PjAcordion from "./pj-acordion"
export function AccordionCours({ item,coursId }: { item: any,coursId:any }) {
  const handleVideoClick = () => {
    // Rediriger l'utilisateur vers une autre page
    redirect(`/dashboard/courses/${coursId}`);
  };
  return (
      <div className="px-5 bg-primary">
          <Accordion type="single" collapsible className="w-full">
              {item.map((chapter: any) => (
                  <AccordionItem key={chapter.id} value={chapter.id}>
                      <AccordionTrigger>{chapter.title}</AccordionTrigger>
                      <AccordionContent>
                          <div className="flex justify-between gap-5 p-2 sm:p1 flex-col md:flex-row">
                              <div className="md:w-2/5 w-full aspect-video md:h-30 w-full h-20">
                                  {chapter.videoUrl && (
                                      <video
                                          className="w-full h-full"
                                          src={chapter.videoUrl}
                                          onClick={handleVideoClick}
                                      />
                                  )}
                              </div>

                              <div className="card text-white md:w-2.5/5 w-full p-3 ">
                                  <h1 className="md:text-2xl p-2 text-start text-xl ">
                                      {chapter.title}
                                  </h1>

                                  <Preview value={chapter.description} />
                                  <div className=" w-full ">
                                      <PjAcordion />
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
