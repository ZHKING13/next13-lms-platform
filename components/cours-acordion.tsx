import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Preview } from "./preview"
import PjAcordion from "./pj-acordion"

export function AccordionCours({ item }: {item:any}) {
  return (
      <div className="px-5" >
           <Accordion type="single" collapsible className="w-full">
          {
            item.map((chapter:any) => (
              <AccordionItem key={chapter.id} value={chapter.id}>
                <AccordionTrigger>{chapter.title}</AccordionTrigger>
                <AccordionContent>
                  <div className="flex justify-between gap-5 p-2 sm:p1 flex-col md:flex-row">
                    {chapter.videoUrl && <video className="md:w-2/5 md:h-80 w-full h-40" src={chapter.videoUrl} controls />}
                    <div style={{
                    backgroundColor: "white"
                    }} className="card border-spacing-1 border-2 md:w-3/5 w-full p-3 " >
                      <h1 className="md:text-2xl p-2 text-center text-xl ">{chapter.title}</h1>
                      
                      <div className="border-1 h-9 flex gap-3 pl-2 items-center justify-items-center bg-gradient-to-l from-violet-900 via-violet-800 to-violet-900 text-white " >
                       <p>Script1</p>
                      </div>
                      <Preview value={chapter.description} />
                      <div className=" w-full sm:w-1/2">
                        <PjAcordion />
                      </div>
                    </div>
                   
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))
      }
      
     
    </Accordion>
   </div>
  )
}
