"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "le titre est requis",
  }),
});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
     
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(JSON.stringify(values));
      const response = await axios.post("/api/courses", values);
      router.push(`/dashboard/teacher/courses/${response.data.id}`);
      toast.success("Cours créé");
    } catch (error) {
      console.error("Erreur lors de la création du cours:", error);
      toast.error("Une erreur est survenu");
    }
  }

  return (
      <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
          <div>
              <h1 className="text-2xl">Nommé le cours</h1>
              {/* <p className="text-sm text-slate-600">
          What would you like to name your course? Don&apos;t worry, you can change this later.
        </p> */}
              <Form {...form}>
                  <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8 mt-8 "
                  >
                      <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Titre du cours</FormLabel>
                                  <FormControl>
                                      <Input
                                          disabled={isSubmitting}
                                          placeholder="ex. 'mindset du trader'"
                                          {...field}
                                          className="text-white"
                                      />
                                  </FormControl>
                                  {/* <FormDescription>
                    What will you teach in this course?
                  </FormDescription> */}
                                  <FormMessage />
                              </FormItem>
                          )}
                      />
                      <div className="flex items-center gap-x-2">
                          <Link href="/dashboard/teacher/courses">
                              <Button type="button" variant="ghost">
                                  Cancel
                              </Button>
                          </Link>
                          <Button
                              type="submit"
                              disabled={!isValid || isSubmitting}
                          >
                              Continue
                          </Button>
                      </div>
                  </form>
              </Form>
          </div>
      </div>
  );
}
 
export default CreatePage;