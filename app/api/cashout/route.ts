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
        const paymentRequest = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
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
                amount: body.amount,
                return_url: "https://cobaltinvestltd.com/dashboard",
                cancel_url: "https://cobaltinvestltd.com/",
                reference: "cobalt_invest",
                state: body.state,
            }),
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
