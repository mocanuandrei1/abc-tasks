import prisma from "@/utils/prisma";
import { unstable_cache } from "next/cache";

export const preload = () => {
  void getAllMermaidDiagrams();
};

export const getAllMermaidDiagrams = unstable_cache(
  () => {
    const diagram = prisma.mermaidDiagram.findMany({
      select: {
        id: true,
        diagram: true,
      },
    });

    if (!diagram) {
      throw new Error("Nu exista noduri in baza de date.");
    }

    return diagram;
  },
  ["mermaidDiagrams"],
  { tags: ["mermaidDiagrams"] }
);
