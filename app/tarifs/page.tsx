"use client";

import { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";
import { Footer } from "@/components/footer";
import Navbar from "@/components/Navbar";

const FormSchema = z.object({
    email: z
        .string()
        .email({ message: "Veuillez entrer une adresse e-mail valide." })
        .nonempty({ message: "Veuillez entrer une adresse e-mail." }),
    name: z.string().nonempty({ message: "Veuillez entrer votre nom." }),
    number: z.string().nonempty({ message: "Veuillez entrer un numéro." }),
    pack: z.string().nonempty({ message: "Veuillez choisir un pack." }),
});
function TarifPage() {
    const [isAnnual, setIsAnnual] = useState(false);
       const [open, setOpen] = useState(false);
 const form = useForm<z.infer<typeof FormSchema>>({
     resolver: zodResolver(FormSchema),
 });

 async function onSubmit(data: z.infer<typeof FormSchema>) {
     try {
         console.log(JSON.stringify(data));
         const res = await fetch("api/send", {
             method: "POST",
             headers: {
                 "Content-Type": "application/json", // Corrected Content-Type header
             },
             body: JSON.stringify(data),
         });
         if (res.ok) {
             toast.success("Votre demande a été soumise avec succès !");
             setOpen(false);
         } else {
             console.log(res);
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
        <div className="bg-[#01051e] w-[100vw]  text-white">
            <Navbar />
            {/* pricing */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="text-white overflow-auto max-h-[500px] sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>Demande d&apos;inscription</DialogTitle>
                        <DialogDescription>
                            Merci de remplir le formulaire notre équipe support
                            vous contactera
                        </DialogDescription>
                    </DialogHeader>
                    <div className=" text-white flex items-center gap-4 py-4">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="w-full space-y-6"
                            >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nom et Prenom</FormLabel>
                                            <Input
                                                onChange={field.onChange}
                                                defaultValue={field.value}
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
                                            <FormLabel>Email</FormLabel>
                                            <Input
                                                onChange={field.onChange}
                                                defaultValue={field.value}
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
                                                Numero de telephone
                                            </FormLabel>
                                            <Input
                                                onChange={field.onChange}
                                                defaultValue={field.value}
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
                                            <FormLabel>Pack</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Choisis ton pack" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Pack Elite">
                                                        Pack Elite
                                                    </SelectItem>
                                                    <SelectItem value="Pack Premium">
                                                        Pack Premium
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="bg-[#7043EC]" type="submit">
                                    Envoyer
                                </Button>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
            <div className="relative font-inter antialiased">
                <main className="relative min-h-screen flex flex-col justify-center  overflow-hidden">
                    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
                        <div>
                            <div className="flex justify-center max-w-[14rem] m-auto mb-8 lg:mb-16">
                                <div className="relative flex w-full p-1  bg-slate-900 rounded-full">
                                    <span
                                        className="absolute inset-0 m-1 pointer-events-none"
                                        aria-hidden="true"
                                    >
                                        <span
                                            className="absolute inset-0 w-1/2 bg-indigo-500 rounded-full shadow-sm shadow-indigo-950/10 transform transition-transform duration-150 ease-in-out"
                                            style={{
                                                transform: !isAnnual
                                                    ? "translateX(0)"
                                                    : "translateX(100%)",
                                            }}
                                        ></span>
                                    </span>

                                    <button
                                        className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${
                                            isAnnual
                                                ? "text-slate-500 "
                                                : "text-white"
                                        }`}
                                        onClick={() => setIsAnnual(false)}
                                    >
                                        Mensuel
                                    </button>
                                    <button
                                        className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${
                                            isAnnual
                                                ? "text-white"
                                                : "text-slate-500 "
                                        }`}
                                        onClick={() => {
                                            setIsAnnual(true);
                                        }}
                                        aria-pressed={!isAnnual}
                                    >
                                        Annuel{" "}
                                        <span
                                            className={
                                                isAnnual
                                                    ? "text-indigo-200"
                                                    : "text-slate-400 dark:text-slate-500"
                                            }
                                        >
                                            -20%
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div className="max-w-sm mx-auto flex items-start lg:flex-row flex-col gap-8 justify-center lg:max-w-none">
                                {/* Pricing tab 1 */}
                                {packages.map((item) => {
                                    return (
                                        <div
                                            key={item.nom}
                                            className="h-full lg:w-1/3 w-full"
                                        >
                                            <div className="relative flex flex-col h-full p-6 rounded-2xl bg-slate-900 border border-slate-200 dark:border-slate-900 shadow shadow-slate-950/5">
                                                <div className="mb-5">
                                                    <div className="text-slate-200 text-lg font-semibold mb-1">
                                                        {item.nom}
                                                    </div>
                                                    <div className="inline-flex  items-baseline mb-2">
                                                        <span className="text-slate-200 font-bold text-2xl">
                                                            {!isAnnual
                                                                ? item.month
                                                                : item.annuel}
                                                        </span>

                                                        <span className="text-slate-500 font-medium">
                                                            {!isAnnual
                                                                ? "/Mois"
                                                                : "/Année"}
                                                        </span>
                                                    </div>
                                                    {/* <div className="text-sm text-slate-500 mb-5">
                                                        There are many
                                                        variations available,
                                                        but the majority have
                                                        suffered.
                                                    </div> */}
                                                </div>
                                                <div className="text-slate-200 font-medium mb-3">
                                                    Contenu du pack:
                                                </div>
                                                <ul className="text-slate-300  text-sm space-y-3 grow">
                                                    {item.items.map((itm) => {
                                                        return (
                                                            <li
                                                                key={itm.id}
                                                                className="flex items-center"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    className="w-5 h-5 fill-violet-500 mr-3 shrink-0"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                                                    ></path>
                                                                </svg>
                                                                <span>
                                                                    {itm.nom}
                                                                </span>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                                <div
                                                    onClick={() =>
                                                        setOpen(true)
                                                    }
                                                >
                                                    <a
                                                        className="w-full mt-6 inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150"
                                                        href="#0"
                                                    >
                                                        Rejoindre
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {/* footer */}
            <Footer />
        </div>
    );
}

export default TarifPage;
const packages = [
    {
        nom: "Pack Elite",
        month: formatPrice(33000),
        annuel: formatPrice(350000),
        items: [
            {
                id: 1,
                nom: "Accès complet au site web avec tous nos cours en ligne.",
            },
            {
                id: 2,
                nom: "Participation au Discord exclusif avec l'ensemble de notre communauté.",
            },
            {
                id: 3,
                nom: "Récapitulatif hebdomadaire de nos activités, disponible une fois par semaine.",
            },
            {
                id: 4,
                nom: "Examen obligatoire pour la certification de vos compétences.",
            },
            {
                id: 5,
                nom: "Partage d'analyses de manière récurrente dans notre Discord.",
            },
            {
                id: 6,
                nom: "Réponses à toutes vos préoccupations et questions dans le Discord.",
            },
            {
                id: 7,
                nom: "Examen de fin de formation obligatoire pour obtenir le financement de COBALT INVEST LTD.",
            },
            {
                id: 8,
                nom: "Opportunité de participer à nos examens de financement pour devenir trader chez Cobalt.",
            },
        ],
    },
    {
        nom: "Pack Premium",
        month: formatPrice(100000),
        annuel: formatPrice(1000000),
        items: [
            {
                id: 1,
                nom: "Accès complet au site web avec tous nos cours en ligne.",
            },
            {
                id: 2,
                nom: "Participation au Discord exclusif avec l'ensemble de notre communauté.",
            },
            {
                id: 3,
                nom: "Récapitulatif hebdomadaire de nos activités, disponible une fois par semaine.",
            },
            {
                id: 4,
                nom: "Accès aux cours en présentiel dans nos bureaux ou via un appel Zoom, une fois par semaine.",
            },
            {
                id: 5,
                nom: "Examen obligatoire pour la certification de vos compétences.",
            },
            {
                id: 6,
                nom: "Partage d'analyses de manière récurrente dans notre Discord.",
            },
            {
                id: 7,
                nom: "Réponses à toutes vos préoccupations et questions dans le Discord, avec un support personnalisé de nos traders.",
            },
            {
                id: 8,
                nom: "Examen de fin de formation obligatoire pour obtenir le financement de COBALT INVEST LTD.",
            },
            {
                id: 9,
                nom: "Opportunité de participer à nos examens de financement pour devenir trader chez Cobalt.",
            },
        ],
    },
];
