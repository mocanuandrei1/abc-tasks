"use server";

import { extractNodes } from "@/utils/functions/nodes/extract-nodes";
import prisma from "@/utils/prisma";
import { authActionAdmin } from "@/utils/safe-action";
import { mermaidSchema } from "@/utils/zod";
import { revalidateTag } from "next/cache";

export const createNodes = authActionAdmin
  .use(async ({ next, ctx }) => {
    if (!ctx.isAdmin) {
      throw new Error("Only admins can do this action.");
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
        throw new Error("Nu poti adauga noduri.");
      }

      if (!diagram) {
        throw new Error("Trebuie sa adaugi un diagrama.");
      }

      // Extract nodes from the diagram
      const newNodes = extractNodes(diagram);

      // if (!newNodes || newNodes.length === 0) {
      //   throw new Error("Trebuie sa adaugi cel putin un nod.");
      // }

      // Fetch existing nodes from the database
      const existingNodes = await prisma.node.findMany();

      // Convert both existing and new nodes to a map for easier comparison by id or name
      const newNodeMap = new Map(newNodes.map((node) => [node.id, node]));
      const existingNodeMap = new Map(
        existingNodes.map((node) => [node.id, node])
      );

      // Determine which nodes to delete
      const nodesToDelete = existingNodes.filter(
        (existingNode) => !newNodeMap.has(existingNode.id)
      );

      // Determine which nodes to update (if necessary)
      const nodesToUpdate = existingNodes.filter((existingNode) =>
        newNodeMap.has(existingNode.id)
      );

      // Determine which nodes to insert
      const nodesToInsert = newNodes.filter(
        (newNode) => !existingNodeMap.has(newNode.id)
      );

      // Perform database operations:
      // Delete nodes that are no longer present
      if (nodesToDelete.length > 0) {
        const idsToDelete = nodesToDelete.map((node) => node.id);
        await prisma.node.deleteMany({
          where: { id: { in: idsToDelete } },
        });
      }

      // Update existing nodes if necessary
      for (const nodeToUpdate of nodesToUpdate) {
        const newNode = newNodeMap.get(nodeToUpdate.id);
        if (
          newNode &&
          (newNode.name !== nodeToUpdate.name ||
            newNode.someOtherField !== nodeToUpdate.someOtherField)
        ) {
          await prisma.node.update({
            where: { id: nodeToUpdate.id },
            data: newNode,
          });
        }
      }

      // Insert new nodes
      if (nodesToInsert.length > 0) {
        await prisma.node.createMany({
          data: nodesToInsert,
        });
      }

      // Delete the existing Mermaid diagram
      await prisma.mermaidDiagram.deleteMany();

      // Create the new Mermaid diagram
      await prisma.mermaidDiagram.create({
        data: {
          id: 1,
          diagram,
        },
      });

      // Revalidate tags
      revalidateTag("nodes");
      revalidateTag("mermaidDiagrams");
      revalidateTag("users");

      return { success: true, name: "Layer 1" };
    }
  );
