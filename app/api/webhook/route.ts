import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    const body = await req.json();

    const encodedState = body.state;
    const decodedState = decodeURIComponent(encodedState);
    const stateObject = JSON.parse(decodedState);
    console.log("State au format JSON:", stateObject);
//     const newUser = await db.user.create({
//         data: {
//         userId: stateObject.userId,
//         pack: stateObject.pack,
//         recurence: stateObject.frequence,
//         stripeCustomerId: "",
//         },
//     }
// })
    return new NextResponse("success", { status: 200 });
}
