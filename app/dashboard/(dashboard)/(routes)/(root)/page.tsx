import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import { getUser } from "@/actions/get-user";
import { getCourses } from "@/actions/get-courses";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import axios from "axios";
export default async function Dashboard({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | undefined };
}) {
    const { userId } = await auth();
    console.log("userId", userId);
    if (!userId) {
        return redirect("/");
    }
    // verifier s'il y a des paramètres de recherche
    // suprimer tout les utilisateur
    if (searchParams) {
        console.log(searchParams);
        const referenceNumber = searchParams?.referenceNumber;
        console.log(referenceNumber);
        
        if (
            referenceNumber &&
            referenceNumber !== "" &&
            referenceNumber !== undefined
        ) {
            const existinguser = await db.user.findUnique({
                where: {
                    stripeCustomerId: referenceNumber,
                },
            });
            console.log(existinguser);
            if (existinguser) {
                await db.user.update({
                    where: {
                        stripeCustomerId: referenceNumber,
                    },
                    data: {
                        isPremium: true,
                    },
                });
            }
        }
    }
console.log("get user in db");
    const curentUser = await getUser(userId);
    console.log("curent user", curentUser);
    
    if (!curentUser?.isPremium || curentUser == null) {
        return redirect("/souscription");
    }

    const { completedCourses, coursesInProgress } = await getDashboardCourses(
        userId
    );
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
            <div className="p-6 bg-[#01051e] space-y-4">
                <CoursesList items={courses} />
            </div>
        </>
    );
}
