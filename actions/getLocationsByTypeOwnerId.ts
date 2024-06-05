import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getLocationByTypeOwnerId = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Non Autoriser");
    }

    const locations = await prisma.location.findMany({
      where: {
        typeOwnerId: userId,
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
