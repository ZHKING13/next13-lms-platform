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
import Image from "next/image";
export default function HomePage() {
     const [active, setActive] = useState("Home");
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
      <div   className="bg-gray-900 text-white">
        <div className="fixed left-0 right-0 top-0 z-50 bg-gray-900  ">
          {/* <Navbar /> */}
          <header>
    <nav className=" border-gray-200 px-4 lg:px-6 py-2.5 -gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="#" className="flex items-center">
                <img src="/images/logo.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap text-white">COBALT INVEST LTD</span>
            </a>
            <div className="flex items-center lg:order-2">
        
                <a href="#" className="text-white bg-green-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 hover:bg-white hover:text-gray-800  dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">S&apos;inscrire</a>
                <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
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
        {/* fin header */}
      </div>
      {/* hero section */}
      <div className="flex flex-col  w-[100wh] gap-1 " >
         <div   className='md:mt-6 h-[100vh]  w-[100%] items-center justify-center'>
        
     <section  className="bg-gray-900 w-[100%] h-[100%]">
    <div className="flex max-w-screen-xl px-4 w-[100%] h-[100%] flex-wrap flex-col-reverse md:flex-row items-center justify-center md:justify-between py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div data-aos="example-anim2"
     data-aos-duration="600"
     data-aos-easing="ease-in-sine" className="mr-auto  place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"> Devenez membre de notre cercle privé</h1>
            <p className="max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Obtenez un accompagnement personnalisé ainsi qu&apos; un développement de carrière au sein de COBALT INVEST LTD</p>
           
              <div>
                <a  href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border  rounded-lg bg-green-500 hover:bg-white hover:text-gray-800   dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Rejoindre COBALT INVEST LTD
            </a> 
            </div>
        </div>
        <div data-aos="fade-down" data-aos-duration="3000" className="  lg:mt-0 lg:col-span-5 lg:flex">
            <img src="images/logo.png" alt="mockup"/>
        </div>                
    </div>
</section>
      </div>
        {/* fin hero section */}
      {/* feature section */}
      <section  className=" bg-gray-900 h-[100vh] w-[100%]">
    <div data-aos="fade-up"
     className="gap-16 items-center w-[100%] h-[100%] py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-white sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">Joignez-vous à des traders rentables pour garantir votre rentabilité</h2>
            <p className="mb-4">Rejoignez notre cercle de traders rentables et bénéficiez d&apos;interactions directes avec des mentors expérimentés. </p>
            <p>Leur expertise accumulée sur des années vous permettra de gagner en expérience et de maximiser vos opportunités sur le marché du trading.</p>
            <p>Rejoignez-nous pour faire évoluer vos compétences et votre succès financier.</p>
        </div>
        <div data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000" className="grid grid-cols-2 gap-4 mt-8">
            <img className="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1"/>
            <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2"/>
        </div>
    </div>
</section>
        {/* feature section */}
        {/* CTA 1 */}
        <div className=" bg-gray-800 w-full ">
    <div  data-aos="fade-down"  data-aos-duration="1500" className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">
                Bénéficiez de l&apos;assistance de
            </span>
            <span className="block text-indigo-500">
                véritable traders rentables.
            </span>
        </h2>
        <p className="text-xl mt-4 max-w-80 mx-auto text-white">
            Nous croyons fermement que la plus grande maîtrise du marché du trading réside dans l&apos;expérience. En côtoyant des traders chevronnés au quotidien, vous allez non seulement acquérir des connaissances approfondies, mais aussi gagner en confiance et en compétence. Chaque transaction, chaque analyse et chaque décision seront des opportunités d&apos;apprentissage qui contribueront à votre croissance en tant que trader prospère.
        </p>
        <div className="lg:mt-0 lg:flex-shrink-0">
            <div data-aos="fade-right"  data-aos-duration="400" className="mt-12 inline-flex rounded-md shadow">
                <button  type="button" className="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Rejoindre COBALT INVEST LTD
                </button>
            </div> 
        </div>
    </div>
</div>
        {/* CTA1 FIN */}
        {/* avantage */}
        <div className="container my-24 mx-auto md:px-6">
         <section className="mb-32 text-center">
    <h2 className="mb-20 text-3xl font-bold">Pourquoi nous rejoindre?</h2>

    <div className="grid lg:grid-cols-3 lg:gap-x-12">
      <div data-aos="flip-left" data-aos-duration="300" className="mb-12 lg:mb-0">
        <div
          className="block h-full rounded-lg  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-gray-800">
          <div className="flex justify-center">
            <div className="-mt-8 inline-block rounded-full bg-indigo-500 p-4  shadow-md">
             <FaPeopleGroup size={46} />
            </div>
          </div>
          <div className="p-6">
            <h5 className="mb-4 text-lg font-semibold">Une equipe d&apos;expert</h5>
            <p>
              Laudantium totam quas cumque pariatur at doloremque hic quos
              quia eius. Reiciendis optio minus mollitia rerum labore
              facilis inventore voluptatem ad, quae quia sint.
            </p>
          </div>
        </div>
      </div>

      <div data-aos="flip-right" data-aos-duration="500" className="mb-12 lg:mb-0">
        <div
          className="block h-full rounded-lg  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-gray-800">
          <div className="flex justify-center">
            <div className="-mt-8 inline-block rounded-full bg-green-500 p-4  shadow-md">
              <GiTeacher size={44} />
            </div>
          </div>
          <div className="p-6">
            <h5 className="mb-4 text-lg font-semibold">Formation de qualité</h5>
            <p>
              Eum nostrum fugit numquam, voluptates veniam neque quibusdam
              ullam aspernatur odio soluta, quisquam dolore animi mollitia a
              omnis praesentium, expedita nobis!
            </p>
          </div>
        </div>
      </div>

      <div  className="">
        <div data-aos="flip-left" data-aos-duration="800"
          className="block h-full rounded-lg  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-gray-800">
          <div className="flex justify-center">
            <div className="-mt-8 inline-block rounded-full bg-primary-100 p-4 text-primary shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" className="h-7 w-7">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
            </div>
          </div>
          <div className="p-6">
            <h5 className="mb-4 text-lg font-semibold">Extremely fast</h5>
            <p>
              Enim cupiditate, minus nulla dolor cumque iure eveniet facere
              ullam beatae hic voluptatibus dolores exercitationem? Facilis
              debitis aspernatur amet nisi?
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
        {/* fin avantage */}
      {/* footer */}
        <div className="rounded-t-3xl ">
      <section className="mx-auto max-w-[1200px] dark:text-white">
        <div className=" grid py-5 md:grid-cols-3">
          <div className=" px-4 py-8 ">
            <h1 className="mb-3 text-justify text-xl font-bold sm:text-left sm:text-3xl">
              <a href="/#home" className="">
                COBALT INVEST LTD
                <span className="inline-block font-bold text-primary">WEB</span>
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
