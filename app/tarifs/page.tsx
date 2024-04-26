"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaLocationArrow,
    FaMobileAlt,
} from "react-icons/fa";
import { formatPrice } from "@/lib/format";
import { Footer } from "@/components/footer";

function TarifPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedLink, setSelectedLink] = useState("Acceuil");
    const [isAnnual, setIsAnnual] = useState(false);
    const navigation = [
        { name: "Acceuil", lien: "/" },
        { name: "Nos étudiants formés", lien: "#" },
        { name: "Tarifs", lien: "/tarifs" },
        { name: "Nous Rejoindre", lien: "#" },
    ];
    return (
        <div className="bg-[#01051e] w-[100vw]  text-white">
            <div className="fixed w-full left-0 right-0 container top-0 z-50 bg-[#010417]  ">
                {/* <Navbar /> */}
                <header>
                    <nav className=" border-gray-200 px-4 lg:px-6 py-2.5 ">
                        <div className="flex flex-wrap justify-between items-end mx-auto md:max-w-screen-xl">
                            <a href="/" className="flex items-center">
                                <img
                                    src="/images/logo.png"
                                    className="mr-3 h-8 sm:h-9"
                                    alt="cobalt Logo"
                                />
                                <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                                    COBALT INVEST LTD
                                </span>
                            </a>
                            <div className="flex items-center lg:order-2">
                                <a
                                    href="/dashboard"
                                    className="text-white max-lg:hidden md:mr-24 bg-[#7043EC] hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 hover:bg-white hover:text-gray-800  dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                >
                                    S&apos;inscrire
                                </a>
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
                                                <ul className=" lg:hidden w-full flex flex-col items-center justify-start h-full ">
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
            {/* pricing */}
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
                                                ? "text-slate-500 dark:text-slate-400"
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
                                                : "text-slate-500 dark:text-slate-400"
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

                            <div className="max-w-sm mx-auto flex items-start md:flex-row flex-col gap-8 justify-center lg:max-w-none">
                                {/* Pricing tab 1 */}
                                {packages.map((item) => {
                                    return (
                                        <div className="h-full md:w-1/3 w-full">
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
                                                <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-3 grow">
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
                                                <a
                                                    className="w-full mt-6 inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150"
                                                    href="#0"
                                                >
                                                    Rejoindre
                                                </a>
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
           <Footer/>
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
