import Stripe from "stripe";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { generateShortOrderId } from "@/lib/format";
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
    try {
        
        const body = await req.json();
        console.log(body);
        const lastDate = await calculerDate(body.frequence)
        const existinguser = await db.user.findUnique({
            where: {
                userId: body?.userId,
            },
        });

        if (!existinguser) {
            await db.user.create({
                data: {
                    userId: body.userId,
                    pack: body.pack,
                    recurence: body.frequence,
                    stripeCustomerId: body?.stripeCustomerId,
                    endDate: lastDate,
                },
            });
        }

        return NextResponse.json({
            code: 200,
            message: "success",
        });
    } catch (error) {
        console.log("[COURSE_ID_CHECKOUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
