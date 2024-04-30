import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const engin = await prisma.engin.create({
      data: {
        ...body,
      },
    });

    return NextResponse.json(engin);
  } catch (error) {
    console.log("Error at /api/engin POST", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
