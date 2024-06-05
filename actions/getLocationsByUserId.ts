import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getLocationByUserId = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Non Autoriser");
    }

    const locations = await prisma.location.findMany({
      where: {
        userId,
      },
      include: {
        Engin: true,
        Type: true,
      },
      orderBy: {
        locationAt: "desc",
      },
    });
    if (!locations) return null;

    return locations;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
