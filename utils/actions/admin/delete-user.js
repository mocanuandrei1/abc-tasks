"use server";

import prisma from "@/utils/prisma";
import { authActionAdmin } from "@/utils/safe-action";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const schema = z.object({
  id: z.number(),
});

export const deleteUser = authActionAdmin
  .use(async ({ next, ctx }) => {
    if (!ctx.isAdmin) {
      throw new ActionError("Only admins can do this action.");
    }
    return next();
  })
  .metadata({ actionName: "deleteUser" })
  .schema(schema)
  .action(async ({ parsedInput: { id }, ctx: { userId, isAdmin } }) => {
    // Check if the current user is allowed to create an admin
    if (!isAdmin) {
      throw new Error("Nu poti sterge un utilizator.");
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("Utilizatorul nu exista.");
    }

    // Delete the user
    await prisma.user.delete({
      where: { id },
    });

    // Revalidate the users cache tag
    revalidateTag("users");

    return { success: true, name: user.name };
  });
