"use server";

import { hash } from "bcryptjs";
import prisma from "@/utils/prisma";
import { authActionClient } from "@/utils/safe-action";
import { revalidateTag } from "next/cache";
import { userSettingsSchema } from "@/utils/zod";

export const userSettings = authActionClient
  .use(async ({ next, ctx }) => {
    if (!ctx.userId) {
      throw new ActionError("Only admins can do this action.");
    }

    return next();
  })
  .metadata({ actionName: "userSettings" })
  .schema(userSettingsSchema)
  .action(
    async ({
      parsedInput: { name, username, password, id },
      ctx: { userId },
    }) => {
      console.log("id", id);
      console.log("userId", userId);

      // Check if the user id is the same as the one in the context.
      if (parseInt(userId) !== id) {
        throw new Error("Poti sa editezi doar propriul cont.");
      }

      // Check if the user exists.
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new Error("Utilizatorul nu exista.");
      }

      // Check if the username is unique.
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUser && existingUser.id !== id) {
        throw new Error("Username-ul este deja folosit.");
      }

      // Hash the password if it's provided.
      let hashedPassword = user.password;
      if (password) {
        hashedPassword = await hash(password, 12);
      }

      // Update the user.
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          name,
          username,
          password: hashedPassword,
          isAdmin: user.isAdmin,
          nodes: user.nodes,
          createdAt: user.createdAt,
        },
      });

      revalidateTag("user");
      return { success: true, user: updatedUser };
    }
  );
