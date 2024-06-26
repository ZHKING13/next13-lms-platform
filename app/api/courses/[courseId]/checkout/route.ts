import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { generateShortOrderId } from "@/lib/format";

export async function POST(
  req: Request,
) {
  try {
  

    const paymentRequest = {
        method: "POST",
        headers: {
            Authorization: `Bearer 71e8caef-a1ec-3be6-833b-c5b13a620bf2`,
            "country-code": "CI",
            "mno-name": "orange",
            channel: "web",
            "Content-Type": "application/json",
            lang: "fr",
        },
        body: JSON.stringify({
            currency: "XOF",
            order_id: generateShortOrderId(), 
            amount: 10,
            return_url: "https://cobaltinvestltd.com/dashboard",
            cancel_url: "https://cobaltinvestltd.com/",
            reference: "cobalt_invest",
        }),
    };

    const bizaoResponse = await fetch('https://api.bizao.com/mobilemoney/v1', paymentRequest);
    const paymentData = await bizaoResponse.json();

    return NextResponse.json({ url: paymentData.payment_url });
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}