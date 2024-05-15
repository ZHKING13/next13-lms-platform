import Stripe from "stripe";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { generateShortOrderId } from "@/lib/format";
import { getToken } from "@/lib/token";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log(body);
        const existinguser = await db.user.findUnique({
            where: {
                userId: body?.userId,
            },
        });
        const url =
            (await body?.methode) === "mastercard" || body?.methode === "visa"
                ? "https://api.bizao.com/debitCard/v2"
                : "https://api.bizao.com/mobilemoney/v1";
        console.log(url);
        if (!existinguser) {
            await db.user.create({
                data: {
                    userId: body.userId,
                    pack: body.pack,
                    recurence: body.frequence,
                    stripeCustomerId: body.name,
                    endDate: new Date(),
                },
            });
        }
        const token = await getToken()
        const headers = {
            Authorization: `Bearer ${token}`,
            "country-code": body?.pays,
            "mno-name": body?.methode,
            channel: "web",
            "Content-Type": "application/json",
            lang: "fr",
            Cookie: "8d387f86a05a3fda48986e2ed42ee33c=5e3fbbc2022dae4513858bb460d36136;route=1715590240.663.1667.719701|81ae3a9a04c06b83bdb4bb4311fcd72droute=1714462950.626.1702.135869|81ae3a9a04c06b83bdb4bb4311fcd72d",
        };
        const bodyData = {
            currency: "XOF",
            order_id: generateShortOrderId(),
            amount: 100,
            return_url: "https://cobaltinvestltd.com/dashboard",
            cancel_url: "https://cobaltinvestltd.com/",
            reference: "Cobalt_Invest",
            state: body.state,
        };
        console.log("HEADERRR BIZAO::", JSON.stringify(headers));
        console.log("BODY BIZAO::",JSON.stringify(bodyData));
        const paymentRequest = {
            method: "POST",
            headers,
            body: JSON.stringify(bodyData),
        };

        const bizaoResponse = await fetch(
            url,
            paymentRequest
        );
        const paymentData = await bizaoResponse.json();
        console.log(paymentData);
        return NextResponse.json({
            url: paymentData.payment_url,
            message: paymentData,
        });
    } catch (error) {
        console.log("[COURSE_ID_CHECKOUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
