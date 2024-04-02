import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
export default function PjAcordion() {
  return (
      <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="1">
            <AccordionTrigger>ressources</AccordionTrigger>
            <AccordionContent>
              <p>Script1</p>
              <p>Script2</p>
              <p>Script3</p>
              <p>Script4</p>
            </AccordionContent>
    </AccordionItem>
    </Accordion>
  )
}
