import { prisma } from "@/lib/prisma";

export const getLocations = async (typeId: string) => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const locations = await prisma.location.findMany({
      where: {
        typeId,
        endDate: {
          gt: yesterday,
        },
      },
    });
    return locations;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
