// import { EmailTemplate } from "../../../components/EmailTemplate";

import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import * as React from "react";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { email, name, number, pack } = await req.json();
console.log('body::::::'+ req)
        const data = await resend.emails.send({
            from: " Cobalt <support@cobaltinvestltd.com>",
            to: ["sergekota@gmail.com", "support@cobaltinvestltd.com"],
            subject: "Demande inscription",
            react: EmailTemplate({
                email,
                name,
                number,
                
            }) as React.ReactElement,
        });

        return Response.json(data);
    } catch (error) {
        return Response.json({ error });
    }
}

