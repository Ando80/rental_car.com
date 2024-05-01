import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

export async function POST(req: Request) {
  const user = await currentUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { location, payment_intent_id } = body;

  const locationData = {
    ...location,
    userName: user.firstName,
    userEmail: user.emailAddresses[0].emailAddress,
    userId: user.id,
    currency: "usd",
    paymentIntentId: payment_intent_id,
  };

  let foundLocation;

  if (payment_intent_id) {
    foundLocation = await prisma.location.findUnique({
      where: { paymentIntentId: payment_intent_id, userId: user.id },
    });
  }

  if (foundLocation && payment_intent_id) {
    //update
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );
    if (current_intent) {
      const update_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        {
          amount: location.totalPrice * 100,
        }
      );

      const res = await prisma.location.update({
        where: { paymentIntentId: payment_intent_id, userId: user.id },
        data: locationData,
      });

      if (!res) {
        return NextResponse.error();
      }
      return NextResponse.json({ paymentIntent: update_intent });
    }
  } else {
    //create
    const paymentIntent = await stripe.paymentIntents.create({
      amount: location.totalPrice * 100,
      currency: locationData.currency,
      automatic_payment_methods: { enabled: true },
    });

    locationData.paymentIntentId = paymentIntent.id;

    await prisma.location.create({
      data: locationData,
    });

    return NextResponse.json({ paymentIntent });
  }

  return new NextResponse("Internal Server Error", { status: 500 });
}
