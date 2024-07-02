"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import styles from "../lib/style";
import AOS from "aos";
import "aos/dist/aos.css";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaLocationArrow,
    FaMobileAlt,
} from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { InfiniteMovingCards } from "@/components/ui/infinit-card";
import { retourClient } from "@/lib/utils";
import { Footer } from "@/components/footer";
import Navbar from "@/components/Navbar";
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

import { useRouter } from "next/router";
import PromotionModal from "@/components/Promo";
const FormSchema = z.object({
    email: z
        .string()
        .email({ message: "Veuillez entrer une adresse e-mail valide." })
        .nonempty({ message: "Veuillez entrer une adresse e-mail." }),
    name: z.string().nonempty({ message: "Veuillez entrer votre nom." }),
    number: z.string().nonempty({ message: "Veuillez entrer un numéro." }),
    pack: z.string().nonempty({ message: "Veuillez choisir un pack." }),
});

export default function HomePage() {
    const [open, setOpen] = useState(false);
    const [showPromo, setShowPromo] = useState(false);
    const [selectedLink, setSelectedLink] = useState("Acceuil");
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
 const closeModal = () => {
        setShowPromo(false);
    };
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
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPromo(true);
        }, 3000); 

        return () => clearTimeout(timer);
    }, []); 

   
    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: "ease-in-out-back",
            once: false,
        });
    }, []);
    return (
        <div className="bg-[#01051e] w-[100vw]  text-white">
            <Navbar />
            {/* hero section */}
{showPromo && <PromotionModal onClose={closeModal} />}
            <div className="flex flex-col  w-full    gap-1  ">
                <div className="md:mt-2 h-[calc(100vh - 50px)]   w-[100%] flex items-center justify-center">
                    <section className="w-full h-[100%]">
                        <div className="flex    px-4 w-[100%] h-[100%]  flex-col md:flex-row items-center justify-center md:justify-between py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 ">
                            <div
                                data-aos="fade-down"
                                data-aos-duration="3000"
                                className=" md:w-1/2 flex-col  items-center justify-center h-[100%]  lg:mt-0  flex"
                            >
                                <img
                                    className="md:w-[70%] object-fill  "
                                    src="images/logo.png"
                                    alt="mockup"
                                />
                            </div>

                            <div
                                data-aos="example-anim2"
                                data-aos-duration="600"
                                data-aos-easing="ease-in-sine"
                                className=" relative flex flex-col items-start justify-center md:w-1/2 md:h-[100%]  "
                            >
                                <div
                                    style={{
                                        filter: "blur(5px)",
                                    }}
                                    className="w-30 h-30 bg-[#7043EC] absolute bottom-10 right-4 overflow-hidden rounded-full  "
                                ></div>
                                <h1 className="max-w-xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                                    {" "}
                                    Devenez membre de notre cercle privé
                                </h1>
                                <p className="max-w-xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                                    Obtenez un accompagnement personnalisé ainsi
                                    qu&apos;un développement de carrière au sein
                                    de COBALT INVEST LTD
                                </p>
                                <div className="mt-3 self-start">
                                    <a
                                        href="/tarifs"
                                        className="bg-[#7043EC] w-[70%] text-lg  text-white font-semibold py-5 md:px-6 px-2 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1"
                                    >
                                        Rejoindre COBALT INVEST LTD
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                {/* fin hero section */}

                {/* feature section */}
                <section className="pl-3 pr-3 container   w-[100%]">
                    <h2 className=" md:text-3xl  text-xl mt-6 text-center tracking-tight font-extrabold text-white">
                        Joignez-vous à des traders rentables pour garantir votre
                        rentabilité
                    </h2>
                    <div
                        data-aos="fade-up"
                        className="gap-16 items-center flex-col md:flex-row  py-4 px-4 mx-auto  flex  md:justify-between lg:py-8 lg:px-6"
                    >
                        <div className="md:pl-8 font-light  text-start flex items-start flex-col text-xl w-[100%] mt-4 max-w-80 mx-auto text-white sm:text-lg dark:text-gray-400 md:w-1/2">
                            <p className="mb-2">
                                Après chaque étape de votre formation en trading
                                avec COBALT INVEST LTD, vous aurez
                                l&apos;opportunité de passer des examens et
                                tests conçus pour évaluer votre progression et
                                vos compétences.
                            </p>
                        </div>
                        <div className="md:pr-8 md:w-1/2 w-full">
                            <img
                                className=" object-cover w-full  rounded-lg"
                                src="/ft.png"
                                alt="office content 1"
                            />
                        </div>
                    </div>
                </section>
                {/* feature section */}

                {/* CTA1 FIN */}

                <div className="px-8 mt-8">
                    <h2 className="text-xl font-extrabold text-white text-center sm:text-2xl">
                        <span className="block">
                            Ce qu&apos;ils pensent de nous
                        </span>
                    </h2>
                    <InfiniteMovingCards speed="slow" items={retourClient} />
                </div>
                {/* feature2 */}
                <section className="pl-3 pr-3 md:mt-4   w-[100%]">
                    <h2 className=" md:text-3xl -mb-10 text-2xl mt-6 text-center tracking-tight font-extrabold text-white">
                        Rejoignez notre communauté de traders rentable
                    </h2>
                    <div
                        data-aos="fade-up"
                        className="gap-6 items-center flex-col md:flex-row  py-4 px-4 mx-auto  flex  md:justify-between lg:py-8 lg:px-6"
                    >
                        <div className="md:pr-8 md:w-[35%]w-full  ">
                            <img
                                data-aos="fade-down"
                                data-aos-duration="1500"
                                className=" object-cover objet-center w-full rounded-lg"
                                src="images/p.png"
                                alt="office content 1"
                            />
                        </div>
                        <div className="md:pl-8 font-light md:text-xl  text-start flex items-start flex-col text-lg w-[100%] mt-4 max-w-80 mx-auto text-white sm:text-lg dark:text-gray-400 md:w-[65%]">
                            <p>
                                Une formation de trading exclusive dévoile les
                                secrets du marché et assure un suivi pour le
                                succès des traders. Accédez à une communauté
                                mondiale de traders rentables et bénéficiez
                                d&apos;évaluations personnalisées pour renforcer
                                vos compétences.
                            </p>{" "}
                        </div>
                    </div>
                </section>
                {/* avantage */}
                <div className="  ">
                    <div
                        data-aos="fade-up"
                        data-aos-duration="1500"
                        className="text-center   md:w-2/3 items-center flex-col justify-center flex mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20"
                    >
                        <h2 className="text-2xl font-extrabold text-white sm:text-2xl">
                            Bénéficiez de l&apos;assistance de véritable traders
                            rentables.
                        </h2>
                        <p className="md:text-xl text-lg w-[100%] text-justify mt-4 max-w-80 mx-auto text-white">
                            Nous croyons fermement que la plus grande maîtrise
                            du marché du trading réside dans l&apos;expérience.
                            En côtoyant des traders chevronnés au quotidien,
                            vous allez non seulement acquérir des connaissances
                            approfondies, mais aussi gagner en confiance et en
                            compétence. Chaque transaction, chaque analyse et
                            chaque décision seront des opportunités
                            d&apos;apprentissage qui contribueront à votre
                            croissance en tant que trader prospère.
                        </p>
                        <div className="lg:mt-0 lg:flex-shrink-0">
                            <div
                                data-aos="flip-down"
                                data-aos-duration="400"
                                className="mt-12 inline-flex rounded-md shadow"
                            >
                                <a
                                    href="/tarifs"
                                    className="py-3 text-lg font-bold px-2 md:px-6 w-[100%] bg-[#7043EC] focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                >
                                    Rejoindre COBALT INVEST LTD
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* center cta 2 */}

                {/* avantage */}
                <section className="pl-3 pr-3 z-2   w-[100%]">
                    <h2 className=" md:text-3xl  text-2xl mt-6 text-center tracking-tight font-extrabold text-white">
                        Développez vos competences en trading et obtenez du
                        financement
                    </h2>
                    <div
                        data-aos="zoom-in"
                        className="gap-16 items-center flex-col md:flex-row  py-4 px-4 mx-auto  flex  md:justify-between lg:py-16 lg:px-6"
                    >
                        <div className="md:pl-8 font-light  text-start flex items-start flex-col text-xl w-[100%] mt-1 max-w-80 mx-auto text-white sm:text-lg dark:text-gray-400 md:w-1/2">
                            <p className="mb-2">
                                Chez COBALT INVEST LTD nous ne vous vendons pas
                                un rêve irréaliste au lieu de cela, nous
                                fournissons les outils et les stratégies pour
                                que les traders de tout niveaux puissent les
                                maîtriser, qu&apos;ils soient complètement
                                nouveaux dans le trading ou qu&apos;ils soient
                                des vétérans expérimentés des marchés. Nous
                                avons conçu COBALT pour que tout le monde
                                puisse s&apos;y plonger et apprendre à trader
                                exactement de la même manière que nous.
                            </p>
                            <p>
                                Chez COBALT INVEST LTD, personne ne pretend que le
                                trading est un parcours facile, mais en suivant
                                notre cadre, nous avons aidé des milliers de
                                traders à trouver des financés.
                            </p>
                        </div>
                        <div className="md:pr-8 md:w-1/2 w-full  ">
                            <img
                                className=" object-cover w-full  rounded-lg"
                                src="/tf.png"
                                alt="office content 1"
                            />
                        </div>
                    </div>
                </section>
                {/* fin avantage */}
                <section className="pl-3 pr-3    w-[100%]">
                    <h2 className=" md:text-3xl  text-xl mt-6 text-center tracking-tight font-extrabold text-white">
                        Devenez rentable et réussissez les defis de financements
                    </h2>
                    <div
                        data-aos="zoom-up"
                        className="gap-16 items-center flex-col md:flex-row  py-4 px-4 mx-auto  flex  md:justify-between lg:py-16 lg:px-6"
                    >
                        <div className="md:pl-8 font-light  text-start flex items-start flex-col text-xl w-[100%] mt-1 max-w-80 mx-auto text-white sm:text-lg dark:text-gray-400 md:w-1/2">
                            <p className="mb-2">
                                Que vous négociez maintenant un compte démo ou
                                un petit compte personnel, que vous n&apos;ayez
                                jamais relevé ou réussi à obtenir un
                                financement, ou que vous ayez réussi à obtenir
                                un financement via une société, mais que vous
                                ayez perdu votre compte, nous sommes là pour
                                vous.
                            </p>
                            <p>
                                COBALT INVEST LTD a pour objectif de vous aider,
                                à obtenir un financement et, surtout, à vous
                                aider à la conserver et à la faire évoluer!
                            </p>
                        </div>
                        <div className="pr-8 md:w-1/2 w-full  ">
                            <img
                                className=" object-cover w-full  rounded-lg"
                                src="/ft.png"
                                alt="office content 1"
                            />
                        </div>
                    </div>
                </section>
                <div className="  ">
                    <div
                        data-aos="fade-down"
                        data-aos-duration="1500"
                        className="text-center  bg-[#010417]  md:w-2/3 items-center flex-col justify-center flex mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20"
                    >
                        <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                            <span className="block">
                                COBALT INVEST LTD est conçu pour vous aider à
                                trouver votre cohérence en tant que trader.
                            </span>
                        </h2>
                        <p className="text-xl w-[100%] text-justify mt-4 max-w-80 mx-auto text-white">
                            COBALT INVEST LTD a été conçu dès le premier jour
                            dans le but d&apos;enseigner aux traders un ensemble
                            unique de compétences en analyse technique, en
                            gestion des risques et en psychologie commerciale
                            afin qu&apos;ils puissent obtenir un financement
                            d&apos;entreprise, un financement privé et créer
                            leurs comptes de trading personnel.
                        </p>
                        <div className="lg:mt-0 lg:flex-shrink-0">
                            <div
                                data-aos="flip-down"
                                data-aos-duration="400"
                                className="mt-12 inline-flex rounded-md shadow"
                            >
                                <a
                                    href="/tarifs"
                                    className="py-3 text-lg font-bold px-2 md:px-6 w-[100%]  bg-[#7043EC] md:text-xl focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                >
                                    Rejoindre COBALT INVEST LTD
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* footer */}
                <Footer />
            </div>
        </div>
    );
}
