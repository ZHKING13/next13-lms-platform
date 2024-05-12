import Stripe from "stripe";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { generateShortOrderId } from "@/lib/format";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log(body);
        const existinguser = await db.user.findUnique({
            where: {
                userId: body?.userId,
            },
        })
        console.log(existinguser);
        if (!existinguser) {
            await db.user.create({
                data: {
                    userId: body.userId,
                    pack: body.pack,
                    recurence: body.frequence,
                    stripeCustomerId: "",
                    endDate: new Date(),
                }
            });
        }
        const paymentRequest = {
            method: "POST",
            headers: {
                Authorization: `Bearer 71e8caef-a1ec-3be6-833b-c5b13a620bf2`,
                "country-code": body?.pays,
                "mno-name": body?.methode,
                channel: "web",
                "Content-Type": "application/json",
                lang: "fr",
                Cookie: "BIGipServer~naomi-ginefa~pool-ocp-router-normandie2-HTTP=!buHJl+AArSbcESDeR4w6CFIKwy5YZBsrbTww0HlLwIypkAAVlnz3dEjzYZlFS8KIrjFJJ6Vi5nIdfViZWdt8qM6gSrkw+ALF59LK1og=; route=1714462950.626.1702.135869|81ae3a9a04c06b83bdb4bb4311fcd72d",
            },
            body: JSON.stringify({
                currency: "XOF",
                order_id: generateShortOrderId(),
                amount: 10,
                return_url: "https://cobaltinvestltd.com/dashboard",
                cancel_url: "https://cobaltinvestltd.com/",
                reference: "cobalt_invest",
                state:body.state
            }),
        };

        const bizaoResponse = await fetch(
            "https://api.bizao.com/mobilemoney/v1",
            paymentRequest
        );
        const paymentData = await bizaoResponse.json();
console.log(paymentData)
        return NextResponse.json({ url: paymentData.payment_url,message: paymentData});
    } catch (error) {
        console.log("[COURSE_ID_CHECKOUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
