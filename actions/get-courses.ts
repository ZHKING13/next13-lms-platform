import { Category, Course } from "@prisma/client";
import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";

type ChapterWithDetails = {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string | null;
  position: number;
  isPublished: boolean;
  isFree: boolean;
  // Ajoutez ici d'autres champs des chapitres si nécessaire.
};

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: ChapterWithDetails[];
  progress: number | null;
  // Si vous avez d'autres relations ou champs à inclure, ajoutez-les ici.
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
  
};

export const getCourses = async ({
  userId,
  title,
  categoryId
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        ...(title && { title: { contains: title } }), // Recherche conditionnelle par titre.
        ...(categoryId && { categoryId }), // Filtre conditionnel par categoryId.
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
            title: true, // Ajout du titre du chapitre.
            description: true, // Ajout de la description.
            videoUrl: true, // Ajout de l'URL de la vidéo.
            position: true, // Ajout de la position.
            isPublished: true, // Cette information est déjà connue via le `where`, mais vous pouvez l'inclure si nécessaire.
            isFree: true, // Ajout de la condition si le chapitre est gratuit.
            // Ajoutez d'autres champs ici selon vos besoins.
          }
        },
        purchases: {
          where: {
            userId,
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      }
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
      courses.map(async course => {
        // Logique pour déterminer le pourcentage de progression.
        const progressPercentage = course.purchases.length > 0 ? await getProgress(userId, course.id) : null;

        return {
          ...course,
          progress: progressPercentage,
        };
      })
    );

    return coursesWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};
