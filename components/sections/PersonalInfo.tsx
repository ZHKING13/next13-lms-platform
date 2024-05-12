"use client";

import React from "react";
import * as z from "zod";

import SectionHeader from "../SectionHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import useStore from "@/store/useStore";
import Container from "../Container";

const formSchema = z.object({
  name: z.string().min(5, { message: "Nom et prenom requis" }).max(100),
  email: z.string().min(1, { message: "Email requis" }).email({
    message: "merci d'entrer une adresse email valide",
  }),
  phone: z.string().refine((val) => /^\d{8}$/.test(val), {
    message: "votre numéro est requis",
  }),
});

type ValidationSchema = z.infer<typeof formSchema>;

export default function PersonalInfo() {
  const { personalInfo, setPersonalInfo, increaseStep } = useStore(
    (state) => state
  );
  const form = useForm<ValidationSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...personalInfo },
  });
  const {
    control,
    formState: { errors },
  } = form;

  const onSubmitHandler = (values: ValidationSchema) => {
    setPersonalInfo({ ...personalInfo, ...values });
    increaseStep(1);
  };

  return (
    <Container onNext={form.handleSubmit(onSubmitHandler)}>
      <SectionHeader
        title="Information personnels"
        description="Merci de renseigner les informations suivantes pour continuer."
      />
      <Form {...form}>
        <form
          className="flex text-white flex-col gap-6"
          onSubmit={() => form.handleSubmit(onSubmitHandler)}
        >
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-c-primary-marine-blue flex items-center justify-between">
                  Nom et prenom
                  <FormMessage>{errors.name?.message}</FormMessage>
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn(
                      "placeholder:font-medium placeholder:text-c-neutral-cool-gray border-c-neutral-light-gray text-c-primary-marine-blue",
                      {
                        "border-c-primary-strawberry-red": errors.name?.message,
                      }
                    )}
                    placeholder="e.g. Stephen King"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-c-primary-marine-blue flex items-center justify-between">
                 Address Email
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn(
                      "placeholder:font-medium placeholder:text-c-neutral-cool-gray border-c-neutral-light-gray text-c-primary-marine-blue",
                      {
                        "border-c-primary-strawberry-red":
                          errors.email?.message,
                      }
                    )}
                    placeholder="e.g. stephenking@lorem.com"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-c-primary-marine-blue flex items-center justify-between">
                 Numéro de telephone
                  <FormMessage>{errors.phone?.message}</FormMessage>
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn(
                      "placeholder:font-medium placeholder:text-c-neutral-cool-gray border-c-neutral-light-gray text-c-primary-marine-blue",
                      {
                        "border-c-primary-strawberry-red":
                          errors.phone?.message,
                      }
                    )}
                    placeholder="e.g. +225 0707070707"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Container>
  );
}