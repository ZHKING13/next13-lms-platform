import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    const body = await req.json();

    // Récupérer le paramètre "state" encodé de la requête
    const encodedState = body.state;

    // Décoder la chaîne encodée
    const decodedState = decodeURIComponent(encodedState);

    // Utiliser une fonction de désérialisation JSON pour convertir la chaîne JSON en objet JavaScript
    const stateObject = JSON.parse(decodedState);

    // Utiliser l'objet stateObject comme nécessaire
    console.log("State au format JSON:", stateObject);

    return new NextResponse("success", { status: 200 });
}
