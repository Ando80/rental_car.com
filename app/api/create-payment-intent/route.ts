import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

export async function POST(req: Request) {
  // Nous n'utilisons plus `currentUser` pour autoriser l'authentification
  const body = await req.json();
  const { location, payment_intent_id, userInfo } = body;

  // Si aucune information utilisateur n'est donnée, utilisez des valeurs par défaut
  const locationData = {
    ...location,
    userName: userInfo?.firstName || "Anonyme",
    userEmail: userInfo?.email || "anonymous@example.com",
    userId: userInfo?.id || "guest", // Remplacer l'ID utilisateur par "guest" si non authentifié
    currency: "usd",
    paymentIntentId: payment_intent_id,
  };

  let foundLocation;

  if (payment_intent_id) {
    foundLocation = await prisma.location.findUnique({
      where: {
        paymentIntentId: payment_intent_id,
        userId: userInfo?.id || "guest",
      },
    });
  }

  if (foundLocation && payment_intent_id) {
    // Mise à jour de l'intention de paiement
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
        where: {
          paymentIntentId: payment_intent_id,
          userId: userInfo?.id || "guest",
        },
        data: locationData,
      });

      if (!res) {
        return NextResponse.error();
      }
      return NextResponse.json({ paymentIntent: update_intent });
    }
  } else {
    // Créer un nouveau payment intent
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
