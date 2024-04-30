export const isTeacher = (userId?: string | null) => {
  // return userId === process.env.NEXT_PUBLIC_TEACHER_ID;
   const teacherIds = process.env.NEXT_PUBLIC_TEACHER_ID?.split(",") || [];
   // Vérifier si l'userId fourni correspond à l'un des identifiants d'enseignant
   return teacherIds.includes(userId || "");
}