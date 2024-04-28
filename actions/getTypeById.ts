import { prisma } from "@/lib/prisma";

export const getTypeById = async (typeId: string) => {
  try {
    const type = await prisma.type.findUnique({
      where: {
        id: typeId,
      },
      include: {
        engins: true,
      },
    });

    if (!type) return null;

    return type;
  } catch (error: any) {
    throw new Error(error);
  }
};
