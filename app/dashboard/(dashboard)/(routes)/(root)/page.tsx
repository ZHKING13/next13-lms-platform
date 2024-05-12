import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import { getUser } from "@/actions/get-user";
import { getCourses } from "@/actions/get-courses";
import { db } from "@/lib/db";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }
  const curentUser = await getUser(userId);
  console.log(curentUser)
  if (!curentUser?.isPremium) {
    return redirect("/souscription");
  }

  const {
    completedCourses,
    coursesInProgress
  } = await getDashboardCourses(userId);
  const categories = await db.category.findMany({
      orderBy: {
          name: "desc",
      },
  });

  const courses = await getCourses({
      userId,
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
      // <div className="p-6 space-y-4">
      //   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      //    <InfoCard
      //       icon={Clock}
      //       label="En cours"
      //       numberOfItems={coursesInProgress.length}
      //    />
      //    <InfoCard
      //       icon={CheckCircle}
      //       label="Terminée"
      //       numberOfItems={completedCourses.length}
      //       variant="success"
      //    />
      //   </div>
      //   <CoursesList
      //     items={[...coursesInProgress, ...completedCourses]}
      //   />
      // </div>
      <>
          <div className="p-6 space-y-4">
              <CoursesList items={courses} />
          </div>
      </>
  );
}
