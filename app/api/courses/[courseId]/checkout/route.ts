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
    const user = await currentUser();

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
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
          userId: user.id,
          courseId: params.courseId
        }
      }
    });

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }


    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      }
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      });

      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        }
      });
    }

    const paymentRequest = {
      method: 'POST',
      headers: {
        Authorization: `Bearer YOUR_ACCESS_TOKEN`,
        'country-code': 'CI', 
        'mno-name': 'orange',
        'channel': 'web', 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: "XOF",
        order_id: generateShortOrderId(), // Assurez-vous que c'est unique
        amount: course.price,
        return_url: "https://yourdomain.com/payment-success",
        cancel_url: "https://yourdomain.com/payment-cancelled",
        // Autres paramètres comme nécessaire

      })
    };

    const bizaoResponse = await fetch('https://api.bizao.com/mobilemoney/v1', paymentRequest);
    const paymentData = await bizaoResponse.json();

    return NextResponse.json({ url: paymentData.payment_url });
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}