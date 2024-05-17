import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
function calculerDate(frequence: string): Date {
    const aujourdhui: Date = new Date();

    if (frequence === "monthly") {
        aujourdhui.setDate(aujourdhui.getDate() + 30);
    } else if (frequence === "yearly") {
        aujourdhui.setFullYear(aujourdhui.getFullYear() + 1);
    }

    return aujourdhui;
}
export async function POST(req: Request) {
    const body = req;
    const requestUrl = req.url;
    if (!requestUrl) {
        console.error("L'URL de la requête est indéfinie.");
        return new NextResponse("Une erreur s'est produite", { status: 400 });
    }
    const url = new URL(requestUrl);

    // Récupérer les paramètres de recherche (query params) de l'URL
    const params = new URLSearchParams(url.search);

    // Récupérer la valeur du paramètre 'referenceNumber'
    const referenceNumber = params.get("referenceNumber");
    if (!referenceNumber) {
        return;
    }
    console.log(referenceNumber);

    console.log("State au format JSON:", requestUrl);
    const existinguser = await db.user.findUnique({
        where: {
            stripeCustomerId: referenceNumber,
        },
    });
    console.log(existinguser);
    if (existinguser) {
        await db.user.update({
            where: {
                stripeCustomerId: referenceNumber,
            },
            data: {
                isPremium: true,
            },
        });
    }
    return new NextResponse("success", { status: 200 });
}
