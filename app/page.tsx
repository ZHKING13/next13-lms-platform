"use client"
import Link from "next/link";
import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../lib/style"
import AOS from 'aos';
import 'aos/dist/aos.css';
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
import { AiOutlineClose } from "react-icons/ai";import Image from "next/image";
import { InfiniteMovingCards } from "@/components/ui/infinit-card";
import { retourClient } from "@/lib/utils";
export default function HomePage() {
  const [active, setActive] = useState("Home");
   const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [selectedLink, setSelectedLink] = useState("Acceuil");
  const navigation = [{ name: "Acceuil" }, { name: "À propos de nous" }, { name: "Contacte" }];
  useEffect(() => {
     AOS.init({
          duration: 600,
  easing: 'ease-in-out-back',
          once: false,
        })
  }, [])
  return (
      <div   className="bg-[#01051e] text-white">
        <div className="fixed left-0 right-0 top-0 z-50 bg-[#010417]  ">
          {/* <Navbar /> */}
          <header>
    <nav className=" border-gray-200 px-4 lg:px-6 py-2.5 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="/" className="flex items-center">
                <img src="/images/logo.png" className="mr-3 h-8 sm:h-9" alt="cobalt Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap text-white">COBALT INVEST LTD</span>
            </a>
            <div className="flex items-center lg:order-2">
        
                <a href="/dashboard" className="text-white max-lg:hidden md:mr-24 bg-[#7043EC] hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 hover:bg-white hover:text-gray-800  dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">S&apos;inscrire</a>
                <div
            className="hidden max-lg:block cursor-pointer"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <RxHamburgerMenu className="text-4xl" />
          </div>
            </div>
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                 <div className="flex gap-16">
      {navigation.map((item) => {
        const isSelected = item.name === selectedLink;
        return (
          <a
            key={item.name}
            href="#"
            className={`relative text-sm leading-6 no-underline ${
              isSelected ? "font-semibold text-white" : "text-gray-500"
            }`}
            onClick={() => setSelectedLink(item.name)}
          >
            {item.name}
            {isSelected ? (
              <motion.div className="absolute -bottom-[1px] left-0 right-0 h-[1px]">
                <svg width="37" height="8" viewBox="0 0 37 8" fill="none">
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
          {isMenuOpen && (
        <div>
          <nav className="fixed text-white top-0 right-0 left-0 bottom-0 lg:bottom-auto bg-[#01051e]  ">
            <div
              className="hidden max-lg:block fixed right-0  px-8 py-4 cursor-pointer"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <AiOutlineClose className="text-4xl" />
            </div>
            <ul className=" lg:hidden w-full flex flex-col items-center justify-center h-full ">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href="#"
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
        {/* fin header */}
      </div>
      {/* hero section */}
      <div className="flex flex-col  w-[100%]   gap-1  " >
         <div   className='md:mt-6 h-[100vh]   w-[100%] flex items-center justify-center'>
        
     <section  className="w-full h-[100%]">
    <div className="flex relative   px-4 w-[100%] h-[100%]  flex-col md:flex-row items-center justify-center md:justify-between py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 ">
        <div data-aos="fade-down" data-aos-duration="3000" className=" md:w-1/2 flex-col  items-center justify-center h-[100%]  lg:mt-0  flex">
                <img className="md:w-[70%] object-none md:h-[85%] " src="images/logo.png" alt="mockup" />
                <p className="md:text-5 xl:text-lg mt-4 ">Plus de 5 000 étudiants formés dans le monde</p>
              </div> 
               <div className="blob1"></div>
         <div data-aos="example-anim2"
     data-aos-duration="600"
     data-aos-easing="ease-in-sine" className="mr-auto  flex flex-col items-center justify-center md:w-1/2 md:h-[100%]  ">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"> Devenez membre de notre cercle privé</h1>
            <p className="max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Obtenez un accompagnement personnalisé ainsi qu&apos; un développement de carrière au sein de COBALT INVEST LTD</p>
           
              <div className="mt-3 w-[100%]">
                <a href="/dashboard" className="bg-[#7043EC] w-[70%] text-xl  text-white font-semibold py-5 px-6 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1">
  Rejoindre COBALT INVEST LTD
</a>

            </div>
        </div>
                      
    </div>
</section>
      </div>
        {/* fin hero section */}
        <div className="flex flex-wrap bg-[#010417] justify-center gap-5 items-center p-3 mt-8 text-gray-500 ">
                <a href="#" className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
            <img className="h-10 w-10" src="https://www.4t.com/assets/svg/logo-black.svg" alt="4T logo" /> 
            
                </a>
                <a href="#" className="mr-5 mb-5 lg:mb-0 ">
                   <img className="h-10 w-10" src="https://rock-capital.eu/wp-content/uploads/2021/09/Rock-Capital-Logo-Black-1.png" alt="rock capital" />                      
                </a>
                      
            </div>
      {/* feature section */}
        <section className="pl-3 pr-3    w-[100%]">
        <h2 className=" md:text-3xl  text-xl mt-6 text-center tracking-tight font-extrabold text-white">Joignez-vous à des traders rentables pour garantir votre rentabilité</h2>
    <div data-aos="fade-up"
            className="gap-16 items-center flex-col md:flex-row  py-4 px-4 mx-auto  flex  md:justify-between lg:py-16 lg:px-6">
        <div className="md:pl-8 font-light  text-start flex items-start flex-col text-xl w-[100%] mt-4 max-w-80 mx-auto text-white sm:text-lg dark:text-gray-400 md:w-1/2">
            <p className="mb-2">Rejoignez notre cercle de traders rentables et bénéficiez d&apos;interactions directes avec des mentors expérimentés. Leur expertise accumulée sur des années vous permettra de gagner en expérience et de maximiser vos opportunités sur le marché du trading.</p>
            <p>Rejoignez-nous pour faire évoluer vos compétences et votre succès financier.</p>
        </div>
          <div className="md:pr-8 md:w-1/2 w-full  " >
            <img className=" object-cover w-full  rounded-lg" src="/images/2.png" alt="office content 1"/>
        </div>
    </div>
</section>
        {/* feature section */}
        {/* CTA 1 */}
        <div className="  ">
    <div  data-aos="fade-down"  data-aos-duration="1500" className="text-center  md:w-2/3 items-center flex-col justify-center flex mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="text-xl font-extrabold text-white sm:text-2xl">
            <span className="block">
                Bénéficiez de l&apos;assistance de véritable traders rentables.

            </span>

        </h2>
        <p className="text-xl w-[100%] mt-4 max-w-80 mx-auto text-white">
            Nous croyons fermement que la plus grande maîtrise du marché du trading réside dans l&apos;expérience. En côtoyant des traders chevronnés au quotidien, vous allez non seulement acquérir des connaissances approfondies, mais aussi gagner en confiance et en compétence. Chaque transaction, chaque analyse et chaque décision seront des opportunités d&apos;apprentissage qui contribueront à votre croissance en tant que trader prospère.
        </p>
        <div className="lg:mt-0 lg:flex-shrink-0">
            <div data-aos="fade-right"  data-aos-duration="400" className="mt-12 inline-flex rounded-md shadow">
                <button  type="button" className="py-5 text-xl font-bold px-6 w-[100%]  bg-[#7043EC] focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Rejoindre COBALT INVEST LTD
                </button>
            </div> 
        </div>
    </div>
</div>
        {/* CTA1 FIN */}
         <div className="mt-8 w-full  ">
    <div  data-aos="fade-up"  data-aos-duration="1500" className="text-center   items-center flex-col justify-center flex mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        
            <div className="pr-8  w-[100px]  " >
            <img className=" object-fit w-full h-[100px] rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1"/>
        </div>

        
            <div className=" md:w-2/3 mt-4  ">
              <p className="text-xl max-w-80 mx-auto text-slate-50">
              Chez COBALT INVEST LTD, vous avez la possibilité de devenir un trader de chez nous afin de pouvoir gérer des fonds que nous allons mettre à votre disposition.
            </p>
        </div>
        
    </div>
        </div>
        {/* feature2 */}
          <section className="pl-3 pr-3 md:mt-4   w-[100%]">
        <h2 className=" md:text-3xl  text-xl mt-6 text-center tracking-tight font-extrabold text-white">Rejoignez notre communauté de traders rentable</h2>
    <div data-aos="fade-up"
            className="gap-16 items-center flex-col md:flex-row  py-4 px-4 mx-auto  flex  md:justify-between lg:py-16 lg:px-6">
             <div className="md:pr-8 md:w-1/2 w-full  " >
            <img  data-aos="fade-left" data-aos-duration="1500" className=" object-contain w-full rounded-lg" src="images/p.png" alt="office content 1"/>
        </div>
        <div className="md:pl-8 font-light  text-start flex items-start flex-col text-xl w-[100%] mt-4 max-w-80 mx-auto text-white sm:text-lg dark:text-gray-400 md:w-1/2">
            <p>En tant que membre de notre formation spéciale en trading, vous bénéficierez d&apos;une gamme d&apos;avantages conçus pour optimiser votre parcours de trading : accès à une formation complète avec un contenu pédagogique complet et structuré, couvrant tous les aspects du trading, des bases aux stratégies avancées, sessions de mentorat personnalisées avec des traders expérimentés, pour des conseils personnalisés et des retours d&apos;expérience précieux, utilisation d&apos;outils d&apos;analyse de pointe pour des analyses techniques et fondamentales approfondies, vous aidant à prendre des décisions éclairées sur le marché, intégration dans une communauté de traders partageant les mêmes intérêts, pour un environnement collaboratif et un soutien continu dans votre apprentissage, participation à des sessions pratiques pour mettre en œuvre vos connaissances, avec un suivi et des retours pour améliorer constamment vos compétences de trading, accès à des ressources exclusives telles que des analyses de marché, des webinaires spécialisés et des publications de recherche, pour rester toujours à la pointe des tendances du marché.
Bénéficiez de l&apos;assistance de véritable traders rentables.</p>        </div>
         
    </div>
</section>
        {/* avantage */}
         <div className="  ">
    <div  data-aos="fade-down"  data-aos-duration="1500" className="text-center   md:w-2/3 items-center flex-col justify-center flex mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="text-xl font-extrabold text-white sm:text-2xl">
            <span className="block">
                Bénéficiez de l&apos;assistance de véritable traders rentables.

            </span>

        </h2>
        <p className="text-xl w-[100%] text-justify mt-4 max-w-80 mx-auto text-white">
            Nous croyons fermement que la plus grande maîtrise du marché du trading réside dans l&apos;expérience. En côtoyant des traders chevronnés au quotidien, vous allez non seulement acquérir des connaissances approfondies, mais aussi gagner en confiance et en compétence. Chaque transaction, chaque analyse et chaque décision seront des opportunités d&apos;apprentissage qui contribueront à votre croissance en tant que trader prospère.
        </p>
        <div className="lg:mt-0 lg:flex-shrink-0">
            <div data-aos="flip-down"  data-aos-duration="400" className="mt-12 inline-flex rounded-md shadow">
                <button  type="button" className="py-5 text-xl font-bold px-6 w-[100%] bg-[#7043EC] focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Rejoindre COBALT INVEST LTD
                </button>
            </div> 
        </div>
    </div>
</div>
        {/* center cta 2 */}
        {/* avantage */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-12 h-[80vh] items-center lg:gap-8 px-4 sm:px-6 lg:px-8 mt-8 text-white ">
                <div data-aos="flip-left" data-aos-duration="300" className="  text-center  px-3 rounded-xl cursor-pointer">
<div className="-mt-8 inline-block rounded-full  shadow-md">
              <img src="https://phantomtradingfx.com/wp-content/uploads/2022/04/ideas-150x150.png" alt="log" />
            </div>  
<h3 className="text-xl font-bold ">Assistance leader du secteur</h3>
          </div>
          <div data-aos="flip-right" data-aos-duration="500" className="  text-center  px-3 rounded-xl cursor-pointer">
<div className="-mt-8 inline-block  ">
              <img src="https://phantomtradingfx.com/wp-content/uploads/2022/04/video-conference-150x150.png" alt="log" />
            </div>  
<h3 className="text-xl font-bold ">CommunauteCommunauté commerciale mondiale</h3>
          </div>
          <div data-aos="flip-left" data-aos-duration="800" className="  text-center  px-3 rounded-xl cursor-pointer">
<div className="-mt-8 inline-block   shadow-md">
       <img src="https://phantomtradingfx.com/wp-content/uploads/2022/04/financial-profit-150x150.png" alt="log" />
  </div>  
<h3 className="text-xl font-bold ">Opportunité de financement accessible</h3>
</div>
                      
            </div>
        {/* avantage */}
         <section className="pl-3 pr-3    w-[100%]">
        <h2 className=" md:text-3xl  text-xl mt-6 text-center tracking-tight font-extrabold text-white">Développez vos competences en trading et obtenez du financement</h2>
    <div data-aos="zoom-in"
            className="gap-16 items-center flex-col md:flex-row  py-4 px-4 mx-auto  flex  md:justify-between lg:py-16 lg:px-6">
        <div className="md:pl-8 font-light  text-start flex items-start flex-col text-xl w-[100%] mt-1 max-w-80 mx-auto text-white sm:text-lg dark:text-gray-400 md:w-1/2">
            <p className="mb-2">Chez COBALT INVEST LTD nous ne vous vendons pas un rêve irréaliste au lieu de cela, nous fournissons les outils et les stratégies pour que les traders de tout niveaux puissent les maitriser, qu&apos;il soient complètement nouveaux dans le trading ou qu&apos;il soient des vétérans expérimentés des marchés.
Noys avons conçu COBLALT INVEST LTD pour que tout le monde puisse s&apos;y plonger et apprendre à trader exactement de la même manière que nous.</p>
            <p>Personne chez COBALR INVEST LTD ne pretend que le trading est un parcours facile, mais en suivant notre cadre, nous avons aidé des milliers de traders à trouver des financés.</p>
        </div>
          <div className="md:pr-8 md:w-1/2 w-full  " >
            <img className=" object-cover w-full  rounded-lg" src="images/3.png" alt="office content 1"/>
        </div>
    </div>
</section>
        {/* fin avantage */}
        <section className="pl-3 pr-3    w-[100%]">
        <h2 className=" md:text-3xl  text-xl mt-6 text-center tracking-tight font-extrabold text-white">Devenez rentable et réussissez les defis de financements</h2>
    <div data-aos="zoom-up"
            className="gap-16 items-center flex-col md:flex-row  py-4 px-4 mx-auto  flex  md:justify-between lg:py-16 lg:px-6">
        <div className="md:pl-8 font-light  text-start flex items-start flex-col text-xl w-[100%] mt-1 max-w-80 mx-auto text-white sm:text-lg dark:text-gray-400 md:w-1/2">
            <p className="mb-2">Que vous négocier maintenant un compte démo ou un petit compte personnel, que vous n&apos;ayez jamais relevé ou réussi à obtenir un financement, ou que vous ayez réussi à obtenir un financement via une société mais que vous ayez fait exploser votre compte... nous somme là pour vous.</p>
            <p>COBALT INVEST LTD a pour objectif de vous aider, à obtenir un financement et, surtout, à vous aider à la conserver et à la faire évoluer!</p>
        </div>
          <div className="pr-8 md:w-1/2 w-full  " >
            <img className=" object-cover w-full  rounded-lg" src="https://i3.wp.com/phantomtradingfx.com/wp-content/uploads/2022/04/Proftiable-Challenge.png" alt="office content 1"/>
        </div>
    </div>
        </section>
          <div className="  ">
    <div  data-aos="fade-down"  data-aos-duration="1500" className="text-center  bg-[#010417]  md:w-2/3 items-center flex-col justify-center flex mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="text-xl font-extrabold text-white sm:text-2xl">
            <span className="block">
                COBALT INVEST LTD est conçu pour vous aider à trouver votre cohérence en tant que trader.
            </span>

        </h2>
        <p className="text-xl w-[100%] text-justify mt-4 max-w-80 mx-auto text-white">
           COBALT INVEST LTD  a été conçu dès le premier jour dans le but d&apos;enseigner aux traders un ensemble unique de compétences en analyse technique, en gestion des risques et en psychologie commerciale afin qu&apos;ils puissent obtenir un financement dentreprise, un financement privé, créer leurs comptes de trading personnel et gagner un temps plein vivre du trading.
        </p>
        <div className="lg:mt-0 lg:flex-shrink-0">
            <div data-aos="flip-down"  data-aos-duration="400" className="mt-12 inline-flex rounded-md shadow">
                <button  type="button" className="py-5 text-xl font-bold px-6 w-[100%]  bg-[#7043EC] focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Rejoindre COBALT INVEST LTD
                </button>
            </div> 
        </div>
    </div>
        </div>
        <div className="px-8 mt-8">
          <h2 className="text-xl font-extrabold text-white text-center sm:text-2xl">
            <span className="block">
               Ce qu&apos;ils pensent de nous
            </span>

        </h2>
          <InfiniteMovingCards speed="slow" items={retourClient} />
        </div>
      {/* footer */}
        <div className="rounded-t-3xl ">
      <section className="mx-auto max-w-[1200px] dark:text-white">
        <div className=" grid py-5 md:grid-cols-3">
          <div className=" px-4 py-8 ">
            <h1 className="mb-3 text-justify text-xl font-bold sm:text-left sm:text-3xl">
              <a href="/dashboard" className="">
                COBALT INVEST LTD
              </a>
            </h1>
            <p className="">
              Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Possimus, voluptate.{" "}
            </p>
            <br />
            <div className="flex items-center gap-3">
              <FaLocationArrow />
              <p>Abidjan, zone 4</p>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <FaMobileAlt />
              <p>+225 123456789</p>
            </div>
            {/* Social Handle */}
          </div>
          <div className="col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10 ">
            <div className="">
              <div className="px-4 py-8 ">
                <h1 className="mb-3 text-justify text-xl font-bold sm:text-left sm:text-xl">
                  Liens utiles
                </h1>
                <ul className={`flex flex-col gap-3`}>
                  <li className="cursor-pointer transition-all duration-300 hover:translate-x-[2px]">
                    Acceuil
                  </li>
                  <li className="cursor-pointer transition-all duration-300 hover:translate-x-[2px]">
                    À propos
                  </li>
                  <li className="cursor-pointer transition-all duration-300 hover:translate-x-[2px]">
                    Contacte
                  </li>
                  <li className="cursor-pointer transition-all duration-300 hover:translate-x-[2px]">
                    S&apos;inscrire
                  </li>
                </ul>
              </div>
            </div>
            <div className="">
              <div className="px-4 py-8 ">
                <h1 className="mb-3 text-justify text-xl font-bold sm:text-left sm:text-xl">
                  Links
                </h1>
                <ul className="flex flex-col gap-3">
                  <li className="cursor-pointer transition-all duration-300 hover:translate-x-[2px]">
                    Privacy Policy
                  </li>
                  <li className="cursor-pointer transition-all duration-300 hover:translate-x-[2px]">
                    Services
                  </li>
                  <li className="cursor-pointer transition-all duration-300 hover:translate-x-[2px]">
                    About us
                  </li>
                </ul>
              </div>
            </div>
            <div className="">
              <div className="px-4 py-8 ">
                <h1 className="mb-3 text-justify text-xl font-bold sm:text-left sm:text-xl">
                  Reseau Sociaux 
                </h1>
                <div className="flex flex-col gap-3">
                  <h1>Subscribe to our newsletter</h1>
                  <input
                    className="rounded-full px-3 py-1 text-black focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 "
                    type="text"
                    placeholder="Email"
                  />
                  <div className="mt-6 flex items-center gap-3">
                    <a href="#" className="duration-200 hover:scale-105">
                      <FaInstagram className="text-3xl" />
                    </a>
                    <a href="#" className="duration-200 hover:scale-105">
                      <FaFacebook className="text-3xl" />
                    </a>
                    <a href="#" className="duration-200 hover:scale-105">
                      <FaLinkedin className="text-3xl" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="border-t-2 border-gray-300/50 py-6 text-center">
            @copyright 2024 COBALT INVEST LTD 
          </div>
        </div>
      </section>
    </div>
     </div>
      </div>
  )
}
