import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { generateShortOrderId } from "@/lib/format";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const curentUser = await currentUser();

    if (!curentUser || !curentUser.id || !curentUser.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      }
    });

    const purchase = await db.purchase.findUnique({
        where: {
            userId_courseId: {
                userId: curentUser.id,
                courseId: params.courseId,
            },
        },
    });

  


    let stripeCustomer = await db.user.findUnique({
        where: {
            userId: curentUser.id,
        },
        select: {
            stripeCustomerId: true,
        },
    });
    

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
          email: curentUser.emailAddresses[0].emailAddress,
      });

      stripeCustomer = await db.stripeCustomer.create({
          data: {
              userId: curentUser.id,
              stripeCustomerId: customer.id,
          },
      });
    }

    const paymentRequest = {
        method: "POST",
        headers: {
            Authorization: `Bearer bnB4S2EyNVFwZ1NacTd2c18xS3ZhQ3d6NXRzYTp5SjBHMHA0U0Nrbm5hOXBxamM1ZUl2RjVFQW9h`,
            "country-code": "CI",
            "mno-name": "orange",
            channel: "web",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            currency: "XOF",
            order_id: generateShortOrderId(), // Assurez-vous que c'est unique
            amount: 100,
            return_url: "https://cobaltinvest.com/dashboard",
            cancel_url: "https://yourdomain.com/",
            // Autres paramètres comme nécessaire
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