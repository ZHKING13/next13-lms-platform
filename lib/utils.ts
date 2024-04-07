import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const retourClient = [
  { 
    quote: "Excellent service, je suis très satisfait !",
    name: "Jean Dupont",
    title: "Directeur des ventes"
  },
  {
    quote: "Très professionnel et réactif. Je recommande vivement !",
    name: "Sophie Martin",
    title: "Responsable des achats"
  },
  {
    quote: "Une équipe très compétente et à l'écoute de mes besoins.",
    name: "Pierre Lambert",
    title: "Chef de projet"
  },
  {
    quote: "Service de qualité, je suis pleinement satisfait.",
    name: "Marie Leclerc",
    title: "Directrice financière"
  },
  {
    quote: "Des résultats au-delà de mes attentes, merci !",
    name: "François Dubois",
    title: "Responsable marketing"
  },
  {
    quote: "Une expérience client exceptionnelle, bravo !",
    name: "Isabelle Lefèvre",
    title: "Directrice des ressources humaines"
  },
  {
    quote: "Je recommande vivement, une équipe professionnelle et efficace.",
    name: "Lucie Bernard",
    title: "Responsable communication"
  },
  {
    quote: "Service impeccable, je suis très satisfait de leur prestation.",
    name: "Antoine Roux",
    title: "Chef de service"
  },
  {
    quote: "Des solutions innovantes et une équipe à l'écoute.",
    name: "Julie Martin",
    title: "Directrice de production"
  },
  {
    quote: "Un service client exceptionnel, je suis ravi !",
    name: "Thomas Lefevre",
    title: "Chef de projet informatique"
  },
  {
    quote: "Très professionnel, je recommande les yeux fermés.",
    name: "Émilie Durand",
    title: "Responsable qualité"
  },
  {
    quote: "Un support client très réactif et efficace.",
    name: "Nicolas Moreau",
    title: "Responsable logistique"
  },
  {
    quote: "Des conseils précieux et un suivi irréprochable.",
    name: "Laure Dubois",
    title: "Directrice des opérations"
  },
  {
    quote: "Je suis pleinement satisfait de leur accompagnement.",
    name: "Vincent Leroy",
    title: "Responsable commercial"
  },
  {
    quote: "Une équipe compétente et à l'écoute, merci !",
    name: "Camille Martin",
    title: "Chef de projet digital"
  }
];


