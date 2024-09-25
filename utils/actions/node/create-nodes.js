"use server";

import { extractNodes } from "@/utils/functions/nodes/extract-nodes";
import prisma from "@/utils/prisma";
import { authActionAdmin } from "@/utils/safe-action";
import { mermaidSchema } from "@/utils/zod";
import { revalidateTag } from "next/cache";

export const createNodes = authActionAdmin
  .use(async ({ next, ctx }) => {
    if (!ctx.isAdmin) {
      throw new ActionError("Only admins can do this action.");
    }
    return next();
  })
  .metadata({ actionName: "createNodes" })
  .schema(mermaidSchema)
  .action(
    async ({
      parsedInput: { diagram },
      ctx: { userId, isAdmin: isUserAdmin },
    }) => {
      if (!isUserAdmin) {
        throw new ActionError("Nu poti adauga noduri.");
      }

      if (!diagram) {
        throw new ActionError("Trebuie sa adaugi un diagrama.");
      }

      // Delete the existing Mermaid diagram.
      await prisma.mermaidDiagram.deleteMany();

      // Create the new Mermaid diagram.
      await prisma.mermaidDiagram.create({
        data: {
          id: 1,
          diagram,
        },
      });

      const nodes = extractNodes(diagram);

      if (!nodes || nodes.length === 0) {
        throw new ActionError("Trebuie sa adaugi cel putin un nod.");
      }

      // Delete the existing nodes.
      await prisma.node.deleteMany();

      // Create the new nodes.
      await prisma.node.createMany({
        data: nodes,
      });

      revalidateTag("nodes");
      revalidateTag("mermaidDiagrams");
      return { success: true, name: "Layer 1" };
    }
  );
