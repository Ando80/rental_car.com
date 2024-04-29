import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { typeId: string } }
) {
  try {
    const body = await req.json();
    const { userId } = auth();

    if (!params.typeId) {
      return new NextResponse("La catégorie est requis", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const type = await prisma.type.update({
      where: {
        id: params.typeId,
      },
      data: { ...body },
    });

    return NextResponse.json(type);
  } catch (error) {
    console.log("Error at /api/type/typeId PATCH", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { typeId: string } }
) {
  try {
    const { userId } = auth();

    if (!params.typeId) {
      return new NextResponse("La catégorie est requis", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const type = await prisma.type.delete({
      where: {
        id: params.typeId,
      },
    });

    return NextResponse.json(type);
  } catch (error) {
    console.log("Error at /api/type/typeId DELETE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
