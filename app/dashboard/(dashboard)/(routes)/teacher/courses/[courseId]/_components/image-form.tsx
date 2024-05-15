"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import Upload from "@/components/Upload";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
};

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Une image est requise",
  }),
});

export const ImageForm = ({
  initialData,
  courseId
}: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Cours mis à jour");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Une erreur est survenue");
    }
  }

  return (
      <div className="mt-6 border bg-[#01051e] rounded-md p-4">
          <div className="font-medium flex items-center justify-between">
              Image du cours
              <Button onClick={toggleEdit} variant="ghost">
                  {isEditing ? (
                      <>Annuler</>
                  ) : !initialData.imageUrl ? (
                      <>
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Ajouter une image
                      </>
                  ) : (
                      <>
                          <Pencil className="h-4 w-4 mr-2" />
                          Modifier l image
                      </>
                  )}
              </Button>
          </div>
          {!isEditing &&
              (!initialData.imageUrl ? (
                  <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                      <ImageIcon className="h-10 w-10 text-slate-500" />
                  </div>
              ) : (
                  <div className="relative aspect-video mt-2">
                      <img
                          alt="Image du cours"
                          className="object-cover rounded-md"
                          src={initialData.imageUrl}
                      />
                  </div>
              ))}
          {isEditing && (
              <div>
                  <Upload
                      onChange={(info) => {
                          if (info.url) {
                              onSubmit({ imageUrl: info?.url });
                          }
                      }}
                  />
                  <div className="text-xs text-muted-foreground mt-4">
                      Un ratio d aspect de 16:9 est recommandé
                  </div>
              </div>
          )}
      </div>
  );
}
