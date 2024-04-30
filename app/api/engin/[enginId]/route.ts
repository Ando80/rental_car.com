import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { enginId: string } }
) {
  try {
    const body = await req.json();
    const { userId } = auth();

    if (!params.enginId) {
      return new NextResponse("engin est requis", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const engin = await prisma.engin.update({
      where: {
        id: params.enginId,
      },
      data: { ...body },
    });

    return NextResponse.json(engin);
  } catch (error) {
    console.log("Error at /api/engin/enginId PATCH", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { enginId: string } }
) {
  try {
    const { userId } = auth();

    if (!params.enginId) {
      return new NextResponse("L engin est requis", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const engin = await prisma.engin.delete({
      where: {
        id: params.enginId,
      },
    });

    return NextResponse.json(engin);
  } catch (error) {
    console.log("Error at /api/engin/enginId DELETE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
