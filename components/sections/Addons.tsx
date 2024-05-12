import React, { useState } from "react";
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
export default function Addons() {
    const { step, increaseStep, decreaseStep, personalInfo, plan } = useStore(
        (state) => state
    );
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const onPrevious = () => {
        decreaseStep(step);
    };
    const user = useAuth();
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            //  console.log(JSON.stringify(data));
            const UserData = {
                userId: user.userId,
                ...personalInfo,
                pack: plan.name,
                frequence: plan.type,
                pays: data.pays,
                methode: data.methode,
            };
            console.log(UserData);

            const paymentData = await axios.post("api/cashout", {
                currency: "XOF",
                order_id: generateShortOrderId(),
                amount: 10,
                return_url: "https://cobaltinvestltd.com/dashboard/search",
                cancel_url: "https://cobaltinvestltd.com/",
                reference: "cobalt_invest",
                state: encodeURIComponent(JSON.stringify(UserData)),
                ...UserData,
                userId: user.userId,
                pays: data.pays,
                methode: data.methode,
                // Autres paramètres comme nécessaire
            });
            console.log(paymentData.data);

            if (!paymentData.data.url) {
                 toast.error(
                     paymentData?.data?.message?.requestError?.serviceException
                         ?.text + " " + paymentData?.data?.message?.requestError?.serviceException
                         ?.variables
                 );
                throw new Error(`No payment URL found in the response.`);
            }

            // Redirection vers la page de paiement
            window.location.href = paymentData.data.url;
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
    return (
        <Container
            onNext={form.handleSubmit(onSubmit)}
            onPreviousStep={onPrevious}
        >
            <SectionHeader
                title="Payement"
                description="merci de renseigner les champs ci-desous"
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
                                            {contry.map((item) => {
                                                return (
                                                    <SelectItem
                                                        key={item.country}
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
