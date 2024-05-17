import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 const axios = require("axios");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const retourClient = [
    {
        quote: "Grâce à COBALT INVEST LTD, j'ai appris à trader de manière professionnelle. Les formations sont claires, concises et m'ont vraiment aidé à améliorer mes compétences en trading.",
        name: "SORO ANTOINE",
    },
    {
        quote: "Je recommande vivement les formations de COBALT INVEST LTD. Les coachs sont très compétents et disponibles pour répondre à toutes nos questions. J'ai vraiment progressé depuis que j'ai suivi leurs cours.",
        name: "HASSAN ZORKOT",
    },
    {
        quote: "COBALT INVEST LTD m'a permis de comprendre les subtilités du trading. Les méthodes d'enseignement sont très interactives et adaptées à tous les niveaux. Je suis très satisfait des résultats que j'ai obtenus.",
        name: "SALIOU AKOABI",
    },
    {
        quote: "Les formations de COBALT INVEST LTD m'ont donné une vision claire du marché financier. J'ai pu appliquer les stratégies apprises avec succès et réaliser des profits intéressants.",
        name: "MAHBOUBA ADAM",
    },
    {
        quote: "Je suis impressionné par la qualité des cours proposés par COBALT INVEST LTD. Les outils pédagogiques sont excellents et j'ai pu rapidement mettre en pratique ce que j'ai appris.",
        name: "MAIGA ALIASSOU",
    },
    {
        quote: "COBALT INVEST LTD m'a donné les connaissances et la confiance nécessaires pour devenir un trader efficace. Les formations sont structurées de manière à ce que chacun puisse progresser à son rythme.",
        name: "ADEDOYE SANOUSSI M.",
    },
    {
        quote: "Je suis très reconnaissant envers COBALT INVEST LTD pour m'avoir initié au monde du trading. Les formateurs sont passionnés et cela se ressent dans la qualité des enseignements.",
        name: "HUSSEIN CHEHAB",
    },
    {
        quote: "Les formations de COBALT INVEST LTD sont complètes et accessibles. J'ai pu acquérir des compétences solides qui me permettent de prendre des décisions éclairées sur les marchés financiers.",
        name: "ALAIN ASSOUAN",
    },
    {
        quote: "COBALT INVEST LTD m'a aidé à développer une stratégie de trading efficace. Les sessions de coaching personnalisé m'ont permis de corriger mes erreurs et d'améliorer mes performances.",
        name: "MAIGA HABIB",
    },
    {
        quote: "Je recommande chaudement COBALT INVEST LTD à tous ceux qui souhaitent se lancer dans le trading. Les formations sont enrichissantes et le suivi après la formation est excellent.",
        name: "KOUADIO FRANCK",
    },
];
export const MethodePayement = [
    {
        name: "Orange Money CI",
        image: "images/orange.png",
        id: "OMCIV2",
    },
    {
        name: "Orange Money BF",
        image: "images/orange.png",
        id: "OMBF",
    },
    {
        name: "Orange Money Mali",
        image: "images/orange.png",
        id: "OMML",
    },
    {
        name: "ORANGE Senegal",
        image: "images/orange.png",
        id: "OMSN",
    },
    {
        name: "Mtn Money CI",
        image: "images/mtn.png",
        id: "MOMOCI",
    },
    {
        name: "MTN Money BENIN",
        image: "images/mtn.png",
        id: "MOMOBJ",
    },
    {
        name: "Moov Money CI",
        image: "images/moov.png",
        id: "FLOOZ",
    },
    {
        name: "Moov Money BENIN",
        image: "images/moov.png",
        id: "FLOOZBJ",
    },
    {
        name: "Wave CI",
        image: "images/wave.png",
        id: "WAVECI",
    },

    {
        name: "AITEL NIGER",
        image: "images/airtel.png",
        id: "AIRTELNG",
    },

    {
        name: "PAYPAL",
        image: "images/pp.png",
        id: "PAYPAL",
    },
    {
        name: "Visa",
        image: "images/visa.png",
        id: "visa",
    },
    {
        name: "Mastercard",
        image: "images/mastercard.png",
        id: "CARD",
    },
];
export const contry = [
    {
        country: "Bénin",
        abbreviation: "bn",
        image: "images/benin.png",
    },
    {
        country: "Burkina Faso",
        abbreviation: "bf",
        image: "images/burkina.jpg",
    },
   
    {
        country: "Côte d'Ivoire",
        abbreviation: "ci",
        image: "images/ci.jpg",
    },
    {
        country: "Guinée",
        abbreviation: "gn",
        image: "images/guinee.png",
    },
    {
        country: "Mali",
        abbreviation: "ml",
        image: "images/mali.png",
    },
    
    
    {
        country: "Sénégal",
        abbreviation: "sn",
        image: "images/senegal.png",
    },
    
    {
        country: "Niger",
        abbreviation: "ng",
        image: "images/ng.png",
    },
    {
        country: "Autre ",
        abbreviation: "others",
        image: "images/glob.jpg",
    },
];

async function getAccessToken() {
    const data = new URLSearchParams();
    data.append("grant_type", "client_credentials");

    try {
        const response = await axios.post("https://api.bizao.com/token", data, {
            headers: {
                Authorization:
                    "Basic TjJ4ZTd4emsyNUZaRW5TMFlnbWxEMTBhOnhwUERza0JJOUdLcGJQamtISnJBTjZRYQ==",
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        return response.data.access_token;
    } catch (error) {
        throw new Error(
            "Erreur lors de la requête pour obtenir l'access token : " + error
        );
    }
}

// Exemple d'utilisation



