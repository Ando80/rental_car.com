import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { Id: string } }
) {
  try {
    if (!params.Id) {
      return new NextResponse("Le paiement est requis", { status: 400 });
    }

    // On ne vérifie plus l'authentification pour la mise à jour du paiement
    const location = await prisma.location.update({
      where: {
        paymentIntentId: params.Id,
      },
      data: { paymentStatus: true },
    });

    return NextResponse.json(location);
  } catch (error) {
    console.log("Error at /api/location/Id PATCH", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { Id: string } }
) {
  try {
    const { userId } = auth();

    if (!params.Id) {
      return new NextResponse("L'ID de la location est requis", {
        status: 400,
      });
    }

    if (!userId && !req.headers.get("Authorization")) {
      return new NextResponse("Authentification requise", { status: 401 });
    }

    const location = await prisma.location.delete({
      where: {
        id: params.Id,
      },
    });

    return NextResponse.json(location);
  } catch (error) {
    console.log("Error at /api/location/Id DELETE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
