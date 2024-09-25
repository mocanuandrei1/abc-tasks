import prisma from "@/utils/prisma";
import { unstable_cache } from "next/cache";

export const preload = () => {
  void getAllNodes();
};

// de pus inapoi cache-ul, nu functiona pt ca trebuia sa le iau din baza de date

export const getAllNodes = async () => {
  const nodes = prisma.node.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  if (!nodes) {
    throw new Error("Nu exista noduri in baza de date.");
  }

  return nodes;
};
