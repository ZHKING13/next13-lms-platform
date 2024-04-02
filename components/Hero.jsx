import styles from "../lib/style";
import { images } from "../assets/index";
import GetStarted from "./GetStarted";

const Hero = () => {
  return (
   <main className=" ">
      <section style={{

      }} className="container flex h-[650px] flex-col items-center justify-center md:h-[500px] ">
        <div style={{
          display: "flex",
          background:"#fff",
          width:"100%",
          
        }}>
          <div
            data-aos="fade-right"
            data-aos-duration="400"
            data-aos-once="true"
           
            className="flex flex-col items-center pl-5  gap-4 text-start text-black md:items-start md:text-left "
          >
            <h1 className=" text-4xl ">
              Devenez membre de notre cercle privé
            </h1>
            <p className="">
              Obtenez un accompagnement personnalisé ainsi qu'un développement de carrière au sein de COBALT INVEST LTD
            </p>
            <div className="space-x-4">
              <button style={{
                backgroundColor:"green"
              }} className="rounded-md border-2 border-primary bg-green-500 px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-primary/80">
               Rejoindre COBALT INVEST LTD
              </button>
             
            </div>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="400"
            data-aos-once="true"
            className="mx-auto max-w-xs p-4"
          >
            <img src="./images/logo.png" alt="No image" className="hover:drop-shadow-md" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;
