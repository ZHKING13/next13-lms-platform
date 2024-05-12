import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

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
    const body = await req.json();

    const encodedState = body.state;
    const decodedState = decodeURIComponent(encodedState);
    const stateObject = JSON.parse(decodedState);
    console.log("State au format JSON:", stateObject);
 const existinguser = await db.user.findUnique({
     where: {
         userId: stateObject?.userId,
     },
 });
    console.log(existinguser);
    const lastDate = await calculerDate(stateObject?.frequence);
    console.log(lastDate);
    if (existinguser) {
       await db.user.update({
           where: {
               userId: stateObject?.userId,
           },
           data: {
               endDate: lastDate,
               isPremium: true,
           },
       });
   }
    return new NextResponse("success", { status: 200 });
}
