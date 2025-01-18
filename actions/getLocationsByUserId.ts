import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getLocationByUserId = async () => {
  try {
    const { userId } = auth(); // Obtenez l'ID de l'utilisateur authentifié

    if (!userId) {
      throw new Error("Utilisateur non authentifié.");
    }

    // Récupérez uniquement les locations associées à l'utilisateur authentifié
    const locations = await prisma.location.findMany({
      where: {
        typeOwnerId: userId, // Filtrez par l'ID de l'utilisateur authentifié
      },
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
    throw new Error(
      error.message ||
        "Une erreur est survenue lors de la récupération des locations."
    );
  }
};
