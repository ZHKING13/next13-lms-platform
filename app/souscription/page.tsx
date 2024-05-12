"use client";

import React from "react";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import useStore from "@/store/useStore";
import Step from "@/components/Step";
import PersonalInfo from "@/components/sections/PersonalInfo";
import Plan from "@/components/sections/Plan";
import Addons from "@/components/sections/Addons";
import Summary from "@/components/sections/Summary";
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
    if (!user.isSignedIn) {
        redirect("/dashboard");
    }
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            console.log(JSON.stringify(data));
            const UserData = { userId: user.userId, ...data };
            console.log(UserData);
            
            const paymentData = await axios.post("api/cashout", {
                currency: "XOF",
                order_id: generateShortOrderId(),
                amount: 10,
                return_url: "https://cobaltinvestltd.com/dashboard/search",
                cancel_url: "https://cobaltinvestltd.com/",
                reference: "cobalt_invest",
                state: encodeURIComponent(JSON.stringify(UserData)),
                ...data,
                userId:user.userId,
                // Autres paramètres comme nécessaire
            });

            if (!paymentData.data.url) {
                throw new Error(`No payment URL found in the response.`);
            }

            console.log(paymentData.data);
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

            <div className=" mt-7 md:mt-0 text-white mx-auto  gap-4 py-4">
                

                <main>
                    <section className="relative h-[172px] w-full bg-no-repeat bg-cover lg:hidden">
                        <div className="flex justify-center pt-[17px] pb-[14px]">
                            <Step stepNumber={1} />
                            <Step stepNumber={2} />
                        </div>
                    </section>
                    {step === 1 && <PersonalInfo />}
                    {step === 2 && <Plan />}
                </main>
            </div>
            {/* <Footer /> */}
        </main>
    );
}
