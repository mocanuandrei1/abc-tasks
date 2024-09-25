import prisma from "@/utils/prisma";
import { unstable_cache } from "next/cache";

export const preload = (id) => {
  void getMermaidDiagram(id);
};

export const getMermaidDiagram = unstable_cache(
  (id) => {
    const diagram = prisma.mermaidDiagram.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        diagram: true,
      },
    });

    if (!diagram) {
      throw new Error("Nu exista nodul in baza de date.");
    }

    return diagram;
  },
  ["mermaidDiagrams"],
  { tags: ["mermaidDiagrams"] }
);
