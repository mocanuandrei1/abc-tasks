import prisma from "@/utils/prisma";
import { unstable_cache } from "next/cache";

export const preload = () => {
  void getAllNodes();
};

export const getAllNodes = unstable_cache(
  () => {
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
  },
  ["nodes"],
  { tags: ["nodes"] }
);
