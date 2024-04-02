import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";

import { Categories } from "./_components/categories";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

const SearchPage = async ({
  searchParams
}: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });
console.log("Courses and their chapters:");
courses.forEach((course, index) => {
  console.log(`Course ${index + 1}: ${course.title}`);
  console.log("Chapters:");
  course.chapters.forEach((chapter, chapterIndex) => {
    console.log(`Chapter ${chapterIndex + 1}:`, chapter); // Affiche tout l'objet chapitre
  });
});
  return (
    <>
      
      <div className="p-6 space-y-4">
        <CoursesList items={courses} />
      </div>
    </>
   );
}
 
export default SearchPage;