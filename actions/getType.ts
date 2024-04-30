import { prisma } from "@/lib/prisma";

export const getTypes = async (searchParams: { title: string }) => {
  try {
    const { title } = searchParams;
    const types = await prisma.type.findMany({
      where: {
        title: {
          contains: title,
        },
      },
      include: { engins: true },
    });
    return types;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
