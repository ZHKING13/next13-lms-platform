"use client";

import React from "react";

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
import { contry } from "@/lib/utils";
const FormSchema = z.object({
    email: z
        .string()
        .email({ message: "Veuillez saisir une adresse e-mail valide." })
        .nonempty({ message: "Veuillez saisir une adresse e-mail." }),
    name: z.string().nonempty({ message: "Veuillez saisir votre nom." }),
    pack: z.string().nonempty({ message: "Veuillez choisir un pack." }),
    pays: z.string().nonempty({ message: "Veuillez choisir votre pays." }),
    number: z.string().nonempty({ message: "Veuillez saisir un numéro." }),
});
export default function Home() {
    const { step } = useStore((state) => state);
    const [open, setOpen] = useState(false);
    const [payement, setPayement] = useState([
        { name: "", image: "images/orange.png" },
    ]);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            console.log(JSON.stringify(data));
            const paymentRequest = {
                method: "POST",
                headers: {
                    Authorization: `Bearer 71e8caef-a1ec-3be6-833b-c5b13a620bf2`,
                    "country-code": "CI",
                    "mno-name": "orange",
                    channel: "web",
                    "Content-Type": "application/json",
                    lang: "fr",
                },
                body: JSON.stringify({
                    currency: "XOF",
                    order_id: generateShortOrderId(), // Assurez-vous que c'est unique
                    amount: 10,
                    return_url: "https://cobaltinvest.com/dashboard",
                    cancel_url: "https://cobaltinvest.com/",
                    reference: "cobalt_invest",
                    // Autres paramètres comme nécessaire
                }),
            };

            const bizaoResponse = await fetch(
                "https://api.bizao.com/mobilemoney/v1",
                paymentRequest
            );
            const paymentData = await bizaoResponse.json();
            console.log(paymentData);
            // go to the payment page paymentData.payment_url
            window.location.href = paymentData.payment_url;
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
                        className=" md:w-1/2 flex-col hidden  items-center justify-center h-[100%]  lg:mt-0  md:flex"
                    >
                        <img
                            className="md:w-[70%] object-fill  "
                            src="images/logo.png"
                            alt="mockup"
                        />
                    </div>
                    <div className=" md:w-[40%] w-[80%] m-auto flex items-center justify-center">
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
                                                                        src="images/orange.png"
                                                                        alt="orange"
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
                                    Suivant
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
