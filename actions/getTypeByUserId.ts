import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getTypesByUserId = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("interdis");
    }
    const types = await prisma.type.findMany({
      where: {
        userId,
      },
      include: {
        engins: true,
      },
    });

    if (!types) return null;

    return types;
  } catch (error: any) {
    throw new Error(error);
  }
};
