"use client"
import { Category, Course } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CourseCard } from "@/components/course-card";
import { AccordionCours } from "./cours-acordion";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: any;
  progress: number | null;
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

export const CoursesList = ({
  items
}: CoursesListProps) => {
  console.log(items);
  return (
    <div>
      <div className="w-full">
        {/* module */}
        <Accordion type="single" collapsible>
          {
            items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>
                  <div>
                    <AccordionCours coursId={item.id} item={item.chapters} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))
          }
        </Accordion>
        {/* {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name!}
          />
        ))} */}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          Oops aucun cours suivie pour l&apos;instant
        </div>
      )}
    </div>
  )
}