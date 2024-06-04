import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { Id: string } }
) {
  try {
    const { userId } = auth();

    if (!params.Id) {
      return new NextResponse("le payement est requis", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

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
      return new NextResponse("l'Id du location est requis", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const engin = await prisma.location.delete({
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
