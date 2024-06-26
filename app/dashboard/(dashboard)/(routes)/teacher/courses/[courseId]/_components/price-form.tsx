"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";

interface PriceFormProps {
  initialData: Course;
  courseId: string;
};

const formSchema = z.object({
  price: z.coerce.number(),
});

export const PriceForm = ({
  initialData,
  courseId
}: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

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
              Prix du cours
              <Button onClick={toggleEdit} variant="ghost">
                  {isEditing ? (
                      <>Annuler</>
                  ) : (
                      <>
                          <Pencil className="h-4 w-4 mr-2" />
                          Modifier le prix
                      </>
                  )}
              </Button>
          </div>
          {!isEditing && (
              <p
                  className={cn(
                      "text-sm mt-2",
                      !initialData.price && "text-slate-500 italic"
                  )}
              >
                  {
                      initialData.price
                          ? formatPrice(initialData.price) // Ajout de l'unité monétaire si nécessaire
                          : "Prix non défini" // Modification pour clarifier l'absence de prix
                  }
              </p>
          )}
          {isEditing && (
              <Form {...form}>
                  <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4 mt-4"
                  >
                      <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                              <FormItem>
                                  <FormControl>
                                      <Input
                                          className="text-white"
                                          type="number"
                                          step="1000"
                                          disabled={isSubmitting}
                                          placeholder="Définissez un prix pour votre cours"
                                          {...field}
                                      />
                                  </FormControl>
                                  <FormMessage />
                              </FormItem>
                          )}
                      />
                      <div className="flex items-center gap-x-2">
                          <Button
                              disabled={!isValid || isSubmitting}
                              type="submit"
                          >
                              Enregistrer
                          </Button>
                      </div>
                  </form>
              </Form>
          )}
      </div>
  );
}
