"use server";

import { multipleNodesSchema } from "@/utils/zod";

import prisma from "@/utils/prisma";
import { authActionAdmin } from "@/utils/safe-action";
import { revalidateTag } from "next/cache";

export const createNodes = authActionAdmin
  .use(async ({ next, ctx }) => {
    if (!ctx.isAdmin) {
      throw new ActionError("Only admins can do this action.");
    }
    return next();
  })
  .metadata({ actionName: "createNodes" })
  .schema(multipleNodesSchema)
  .action(
    async ({
      parsedInput: { nodes },
      ctx: { userId, isAdmin: isUserAdmin },
    }) => {
      if (!isUserAdmin) {
        throw new ActionError("Nu poti adauga noduri.");
      }

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
      return { success: true };
    }
  );
