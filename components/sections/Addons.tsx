"use client";
import React, { useState, useEffect } from "react";
import SectionHeader from "../SectionHeader";
import Container from "../Container";
import AddonCard from "../AddonCard";
import useStore from "@/store/useStore";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { addOns } from "@/datas";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { generateShortOrderId } from "@/lib/format";
import Script from "next/script";

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
} from "@/components/ui/select"; // import { addOns } from "@datas/index";
import { MethodePayement, contry } from "@/lib/utils";
const FormSchema = z.object({
    pays: z.string().nonempty({ message: "Veuillez choisir votre pays." }),
    methode: z
        .string()
        .nonempty({ message: "Veuillez choisir votre methode de payement." }),
});

// Dans votre composant, attendez que le script soit chargé avant d'initialiser la classe PaiementPro
async function initializePayment(
    amount: number,
    referenceNumber: string,
    customerEmail: string,
    customerFirstName: string,
    customerLastname: string,
    customerPhoneNumber: string,
    description: string,
    channel: string,
    returnContext: any
): Promise<string> {
    try {
        let paiementPro = new PaiementPro("PP-F3196");
        paiementPro.amount = amount;
        paiementPro.channel = channel;
        paiementPro.referenceNumber = referenceNumber;
        paiementPro.customerEmail = customerEmail;
        paiementPro.customerFirstName = customerFirstName;
        paiementPro.customerLastname = customerLastname;
        paiementPro.customerPhoneNumber = customerPhoneNumber;
        paiementPro.description = description;
        paiementPro.returnContext = returnContext;
        paiementPro.notificationURL = "https://cobaltinvestltd.com/api/webhook";
        paiementPro.returnURL = "https://cobaltinvestltd.com/dashboard";

        await paiementPro.getUrlPayment();

        if (paiementPro.success) {
            return paiementPro.url;
        } else {
            throw new Error("Erreur lors de l'initialisation du paiement");
        }
    } catch (error) {
        throw new Error(
            "Une erreur s'est produite lors de l'initialisation du paiement : " +
                error
        );
    }
}
export default function Addons() {
    const { step, increaseStep, decreaseStep, personalInfo, plan,setLoading } = useStore(
        (state) => state
    );
    const [open, setOpen] = useState(false);
    const [selectContry, setSelectContry] = useState("");
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const onPrevious = () => {
        decreaseStep(step);
    };
    const user = useAuth();
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            setLoading(true);
            const stripeCustomerId = await generateShortOrderId();
            const UserData = {
                userId: user.userId,
                ...personalInfo,
                pack: plan.name,
                frequence: plan.type,
                pays: data.pays,
                methode: data.methode,
                stripeCustomerId,
            };
            console.log(UserData);
            const rest = await axios.post("api/cashout", {
                ...UserData,
            });
            if (rest.data.code !== 200) {
                toast.error("Une erreur s'est produite merci de réesayer");
                return;
            }
            const amount = 100;
            const referenceNumber = stripeCustomerId;
            const customerEmail = personalInfo.email;
            const customerFirstName = personalInfo.name;
            const customerLastname = personalInfo.name;
            const customerPhoneNumber = personalInfo.phone;
            const description = plan.name;
            const channel = data.methode == "visa" ? "CARD" : data.methode;
            const returnContext = encodeURIComponent(JSON.stringify(UserData));
            const paymentUrl = await initializePayment(
                amount,
                referenceNumber,
                customerEmail,
                customerFirstName,
                customerLastname,
                customerPhoneNumber,
                description,
                channel,
                returnContext
            );
            window.location.href = paymentUrl;
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
    const onNext = () => {
        // increaseStep(step);
        //    form.handleSubmit(onSubmit)();
    };
    useEffect(() => {}, []);
    return (
        <Container
            onNext={form.handleSubmit(onSubmit)}
            onPreviousStep={onPrevious}
        >
            <SectionHeader
                title="Paiement"
                description="merci de renseigner les champs ci-desous"
            />
            <Script
                src="https://www.paiementpro.net/webservice/onlinepayment/js/paiementpro.v1.0.2.js"
                strategy="lazyOnload"
                onLoad={() =>
                    console.log(
                        `script loaded correctly, window.FB has been populated`
                    )
                }
            />
            <section className="mt-[22px] flex flex-col gap-4">
                <Form {...form}>
                    <form
                        className="flex mb-2 text-white flex-col gap-6"
                        onSubmit={() => form.handleSubmit(onSubmit)}
                    >
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
                                            {contry.map((item, index) => {
                                                return (
                                                    <SelectItem
                                                        key={index}
                                                        value={
                                                            item.abbreviation
                                                        }
                                                    >
                                                        <div className="flex gap-4">
                                                            <img
                                                                className="h-6 w-5"
                                                                src={item.image}
                                                                alt="contry flag"
                                                            />
                                                            <span>
                                                                {item.country}
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
                            name="methode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Methode de payement</FormLabel>
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
                                            {MethodePayement.map((item) => {
                                                return (
                                                    <SelectItem
                                                        key={item.name}
                                                        value={item.id}
                                                    >
                                                        <div className="flex gap-4">
                                                            <img
                                                                className="h-6 w-5"
                                                                src={item.image}
                                                                alt="payement logo"
                                                            />
                                                            <span>
                                                                {item.name}
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
                    </form>
                </Form>
            </section>
        </Container>
    );
}
