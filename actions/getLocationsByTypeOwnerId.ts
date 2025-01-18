import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getLocationByTypeOwnerId = async () => {
  try {
    const { userId } = auth();

    let whereCondition = {};

    // Vérifier si l'utilisateur n'est pas authentifié
    if (!userId) {
      whereCondition = { typeOwnerId: null }; // Filtrer pour les locations des utilisateurs non authentifiés
    }

    const locations = await prisma.location.findMany({
      where: whereCondition,
      include: {
        Engin: true,
        Type: true,
      },
      orderBy: {
        locationAt: "desc",
      },
    });

    if (!locations || locations.length === 0) return null;

    return locations;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
