"use client";

import React from "react";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import useStore from "@/store/useStore";

import { useState, useEffect } from "react";
import axios from "axios";
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
import { formatPrice, generateShortOrderId } from "@/lib/format";
import { Footer } from "@/components/footer";
import Navbar from "@/components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { sendBizaoRequest } from "@/lib/cashout";
import AOS from "aos";
import "aos/dist/aos.css";
import { MethodePayement, contry } from "@/lib/utils";
import { db } from "@/lib/db";
const FormSchema = z.object({
    name: z.string().nonempty({ message: "Veuillez saisir votre nom." }),
    pack: z.string().nonempty({ message: "Veuillez choisir un pack." }),
    pays: z.string().nonempty({ message: "Veuillez choisir votre pays." }),
    frequence: z
        .string()
        .nonempty({ message: "Veuillez la frequence d'abonnement." }),
    methode: z
        .string()
        .nonempty({ message: "Veuillez choisir votre methode de payement." }),
    number: z.string().nonempty({ message: "Veuillez saisir un numéro." }),
});
export default function Souscription() {
    const { step } = useStore((state) => state);
    const [open, setOpen] = useState(false);
    const [payement, setPayement] = useState([
        { name: "", image: "images/orange.png" },
    ]);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const user = useAuth();
    console.log(user);
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
           
            console.log(JSON.stringify(data));
            const UserData = { userId: user.userId, ...data };
            console.log(UserData);
            //  const addNew = db.user.create({
            //      data: {
            //          userId: UserData?.userId ? UserData.userId : "test",
            //          pack:UserData.pack,
            //          recurence: UserData.frequence,
            //          stripeCustomerId:""
                    
            //      },
            //  });
            console.log(encodeURIComponent(JSON.stringify(UserData)));

            const paymentData = await axios.post(
                "https://api.bizao.com/mobilemoney/v1",
                {
                    currency: "XOF",
                    order_id: generateShortOrderId(),
                    amount: 10,
                    return_url: "https://cobaltinvestltd.com/dashboard/search",
                    cancel_url: "https://cobaltinvestltd.com/",
                    reference: "cobalt_invest",
                    state: encodeURIComponent(JSON.stringify(UserData)),
                    // Autres paramètres comme nécessaire
                },
                {
                    headers: {
                        Authorization:
                            "Bearer 71e8caef-a1ec-3be6-833b-c5b13a620bf2",
                        "country-code": UserData.pays,
                        "mno-name": UserData.methode,
                        channel: "web",
                        "Content-Type": "application/json",
                        lang: "fr",
                        Cookie: "BIGipServer~naomi-ginefa~pool-ocp-router-normandie2-HTTP=!buHJl+AArSbcESDeR4w6CFIKwy5YZBsrbTww0HlLwIypkAAVlnz3dEjzYZlFS8KIrjFJJ6Vi5nIdfViZWdt8qM6gSrkw+ALF59LK1og=; route=1714462950.626.1702.135869|81ae3a9a04c06b83bdb4bb4311fcd72d",
                    },
                }
            );

            if (!paymentData.data.payment_url) {
                throw new Error(`No payment URL found in the response.`);
            }

            console.log(paymentData.data);
            // Redirection vers la page de paiement
            window.location.href = paymentData.data.payment_url;
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

    // if (!userId) {
    //     return redirect("/");
    // }
    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: "ease-in-out-back",
            once: false,
        });
    }, []);
    return (
        <main className="bg-[#01051e]  text-white">
            <Navbar />

            <div className=" mt-10 text-white mx-auto  gap-4 py-4">
                <h1 className="text-5xl mt-10 text-white mb-3 text-center">
                    Inscription
                </h1>

                <div className="flex m-auto gap-4">
                    <div
                        data-aos="fade-down"
                        data-aos-duration="3000"
                        className=" md:w-[50%] flex-col hidden  items-center justify-center h-[100%]  lg:mt-0  md:flex"
                    >
                        <img
                            className="md:w-[70%] object-cover  "
                            src="images/logo.png"
                            alt="mockup"
                        />
                    </div>
                    <div className=" md:w-[40%] w-[80%] m-auto flex items-center justify-center">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="w-full space-y-1 flex flex-col"
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
                                    name="pays"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pays</FormLabel>
                                            <Select
                                                onValueChange={(newValue) => {
                                                    field.onChange(newValue);
                                                    console.log(field);
                                                }}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pays de residence" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {contry.map((item) => {
                                                        return (
                                                            <SelectItem
                                                                key={
                                                                    item.country
                                                                }
                                                                value={
                                                                    item.abbreviation
                                                                }
                                                            >
                                                                <div className="flex gap-4">
                                                                    <img
                                                                        className="h-6 w-5"
                                                                        src={
                                                                            item.image
                                                                        }
                                                                        alt="contry flag"
                                                                    />
                                                                    <span>
                                                                        {
                                                                            item.country
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </SelectItem>
                                                        );
                                                    })}
                                                </SelectContent>
                                            </Select>

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
                                <FormField
                                    control={form.control}
                                    name="frequence"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Type d abonnement
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Choisis ton type d'abonnement" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="month">
                                                        Mensuel
                                                    </SelectItem>
                                                    <SelectItem value="year">
                                                        Annuel
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="methode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Methode de payement
                                            </FormLabel>
                                            <Select
                                                onValueChange={(newValue) => {
                                                    field.onChange(newValue);
                                                    console.log(field);
                                                }}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Moyen de payement" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {MethodePayement.map(
                                                        (item) => {
                                                            return (
                                                                <SelectItem
                                                                    key={
                                                                        item.name
                                                                    }
                                                                    value={
                                                                        item.id
                                                                    }
                                                                >
                                                                    <div className="flex gap-4">
                                                                        <img
                                                                            className="h-6 w-5"
                                                                            src={
                                                                                item.image
                                                                            }
                                                                            alt="payement logo"
                                                                        />
                                                                        <span>
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </SelectItem>
                                                            );
                                                        }
                                                    )}
                                                </SelectContent>
                                            </Select>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="bg-[#7043EC]" type="submit">
                                    Passer au payement
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
