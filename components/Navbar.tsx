"use client"
import { motion } from "framer-motion";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
const FormSchema = z.object({
    email: z
        .string()
        .email({ message: "Veuillez entrer une adresse e-mail valide." })
        .nonempty({ message: "Veuillez entrer une adresse e-mail." }),
    nom: z.string().nonempty({ message: "Veuillez entrer votre nom." }),
    number: z.string().nonempty({ message: "Veuillez entrer un numéro." }),
    pack: z.string().nonempty({ message: "Veuillez choisir un pack." }),
});

const Navbar = () => {

  const [showMenu, setShowMenu] = useState(false);
      const [active, setActive] = useState("Home");
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [selectedLink, setSelectedLink] = useState("Acceuil");
      const navigation = [
          { name: "Acceuil", lien: "/" },
          { name: "Nos étudiants formés", lien: "#" },
          { name: "Tarifs", lien: "/tarifs" },
          { name: "Nous Rejoindre", lien: "#" },
      ];

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
      try {
          const res = await fetch("api/send", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json", // Corrected Content-Type header
              },
              body: JSON.stringify(data),
          });
          if (res.ok) {
              toast.success("Votre demande a été soumis avec succès !");
             
          } else {
              console.log(res)
              toast.error(
                  "Une erreur s'est produite lors de la soumission du formulaire."
              );
              
          }
      } catch (error) {
          toast.error(
              "Une erreur s'est produite lors de la soumission du formulaire."
          );
          console.error(
              "Une erreur s'est produite lors de la soumission du formulaire :",
              error
          );
         
      }
  }


  return (
      <>
          <div className="fixed w-full left-0 right-0 container top-0 z-50 bg-[#010417]  ">
              {/* <Navbar /> */}
              <header>
                  <nav className=" border-gray-200 px-1 lg:px-2 py-2.5 ">
                      <div className="flex flex-wrap justify-between items-center mx-auto md:max-w-screen-xl">
                          <a href="/" className="flex items-center">
                              <img
                                  src="/images/logo.png"
                                  className="mr-3 h-10 sm:h-9"
                                  alt="cobalt Logo"
                              />
                              <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                                  COBALT INVEST LTD
                              </span>
                          </a>

                          <div className="flex items-center lg:order-2">
                              <Dialog>
                                  <DialogTrigger asChild>
                                      <a
                                          href="#"
                                          className="text-white max-lg:hidden md:mr-4 bg-[#7043EC] hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-0 dark:bg-primary-600 hover:bg-white hover:text-gray-800  dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                      >
                                          S&apos;inscrire
                                      </a>
                                  </DialogTrigger>
                                  <DialogContent className="text-white overflow-auto max-h-[600px] sm:max-w-[425px]">
                                      <DialogHeader>
                                          <DialogTitle>
                                              Demande d'inscription
                                          </DialogTitle>
                                          <DialogDescription>
                                              Merci de remplir le formulaire
                                              notre équipe support vous
                                              contactera
                                          </DialogDescription>
                                      </DialogHeader>
                                      <div className=" text-white flex items-center gap-4 py-4">
                                          <Form {...form}>
                                              <form
                                                  onSubmit={form.handleSubmit(
                                                      onSubmit
                                                  )}
                                                  className="w-full space-y-6"
                                              >
                                                  <FormField
                                                      control={form.control}
                                                      name="nom"
                                                      render={({ field }) => (
                                                          <FormItem>
                                                              <FormLabel>
                                                                  Nom et Prenom
                                                              </FormLabel>
                                                              <Input
                                                                  onChange={
                                                                      field.onChange
                                                                  }
                                                                  defaultValue={
                                                                      field.value
                                                                  }
                                                                  type="text"
                                                                  placeholder="Nom et prenom"
                                                              />

                                                              <FormMessage />
                                                          </FormItem>
                                                      )}
                                                  />
                                                  <FormField
                                                      control={form.control}
                                                      name="email"
                                                      render={({ field }) => (
                                                          <FormItem>
                                                              <FormLabel>
                                                                  Email
                                                              </FormLabel>
                                                              <Input
                                                                  onChange={
                                                                      field.onChange
                                                                  }
                                                                  defaultValue={
                                                                      field.value
                                                                  }
                                                                  type="text"
                                                                  placeholder="Email"
                                                              />

                                                              <FormMessage />
                                                          </FormItem>
                                                      )}
                                                  />
                                                  <FormField
                                                      control={form.control}
                                                      name="number"
                                                      render={({ field }) => (
                                                          <FormItem>
                                                              <FormLabel>
                                                                  Numero de
                                                                  telephone
                                                              </FormLabel>
                                                              <Input
                                                                  onChange={
                                                                      field.onChange
                                                                  }
                                                                  defaultValue={
                                                                      field.value
                                                                  }
                                                                  type="text"
                                                                  placeholder="Numéro de telephone"
                                                              />

                                                              <FormMessage />
                                                          </FormItem>
                                                      )}
                                                  />

                                                  <FormField
                                                      control={form.control}
                                                      name="pack"
                                                      render={({ field }) => (
                                                          <FormItem>
                                                              <FormLabel>
                                                                  Pack
                                                              </FormLabel>
                                                              <Select
                                                                  onValueChange={
                                                                      field.onChange
                                                                  }
                                                                  defaultValue={
                                                                      field.value
                                                                  }
                                                              >
                                                                  <FormControl>
                                                                      <SelectTrigger>
                                                                          <SelectValue placeholder="Choisis ton pack" />
                                                                      </SelectTrigger>
                                                                  </FormControl>
                                                                  <SelectContent>
                                                                      <SelectItem value="Pack Elite">
                                                                          Pack
                                                                          Elite
                                                                      </SelectItem>
                                                                      <SelectItem value="Pack Premium">
                                                                          Pack
                                                                          Premium
                                                                      </SelectItem>
                                                                  </SelectContent>
                                                              </Select>

                                                              <FormMessage />
                                                          </FormItem>
                                                      )}
                                                  />
                                                  <Button
                                                      className="bg-[#7043EC]"
                                                      type="submit"
                                                  >
                                                      Envoyer
                                                  </Button>
                                              </form>
                                          </Form>
                                      </div>
                                  </DialogContent>
                              </Dialog>

                              <div
                                  className="hidden max-lg:block cursor-pointer"
                                  onClick={() => {
                                      setIsMenuOpen(!isMenuOpen);
                                  }}
                              >
                                  {isMenuOpen && (
                                      <div>
                                          <nav className="fixed text-white top-0 right-0 left-0 bottom-0 lg:bottom-auto bg-[#01051e]  ">
                                              <div
                                                  className="hidden max-lg:block fixed right-0  px-8 py-4 cursor-pointer"
                                                  onClick={() => {
                                                      setIsMenuOpen(
                                                          !isMenuOpen
                                                      );
                                                  }}
                                              >
                                                  <AiOutlineClose className="text-4xl" />
                                              </div>
                                              <ul className=" lg:hidden w-full flex flex-col items-center justify-center h-full ">
                                                  {navigation.map((item) => (
                                                      <li key={item.name}>
                                                          <a
                                                              href={item.lien}
                                                              className="font-montserrat leading-normal text-lg text-slate-gray"
                                                          >
                                                              {item.name}
                                                          </a>
                                                      </li>
                                                  ))}
                                              </ul>
                                          </nav>
                                      </div>
                                  )}
                                  <RxHamburgerMenu className="text-4xl" />
                              </div>
                          </div>

                          <div
                              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                              id="mobile-menu-2"
                          >
                              <div className="flex gap-16">
                                  {navigation.map((item) => {
                                      const isSelected =
                                          item.name === selectedLink;
                                      return (
                                          <a
                                              key={item.name}
                                              href={item.lien}
                                              className={`relative text-sm leading-6 no-underline ${
                                                  isSelected
                                                      ? "font-semibold text-white"
                                                      : "text-gray-500"
                                              }`}
                                              onClick={() =>
                                                  setSelectedLink(item.name)
                                              }
                                          >
                                              {item.name}
                                              {isSelected ? (
                                                  <motion.div className="absolute -bottom-[1px] left-0 right-0 h-[1px]">
                                                      <svg
                                                          width="37"
                                                          height="8"
                                                          viewBox="0 0 37 8"
                                                          fill="none"
                                                      >
                                                          <motion.path
                                                              d="M1 5.39971C7.48565 -1.08593 6.44837 -0.12827 8.33643 6.47992C8.34809 6.52075 11.6019 2.72875 12.3422 2.33912C13.8991 1.5197 16.6594 2.96924 18.3734 2.96924C21.665 2.96924 23.1972 1.69759 26.745 2.78921C29.7551 3.71539 32.6954 3.7794 35.8368 3.7794"
                                                              stroke="#7043EC"
                                                              strokeWidth="2"
                                                              strokeLinecap="round"
                                                              strokeLinejoin="round"
                                                              initial={{
                                                                  strokeDasharray: 84.20591735839844,
                                                                  strokeDashoffset: 84.20591735839844,
                                                              }}
                                                              animate={{
                                                                  strokeDashoffset: 0,
                                                              }}
                                                              transition={{
                                                                  duration: 1,
                                                              }}
                                                          />
                                                      </svg>
                                                  </motion.div>
                                              ) : null}
                                          </a>
                                      );
                                  })}
                              </div>
                          </div>
                      </div>
                  </nav>
              </header>

              {/* fin header */}
          </div>
      </>
  );
};

export default Navbar;
