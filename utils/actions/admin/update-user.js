"use server";

import { hash } from "bcryptjs";
import { userSchema } from "@/utils/zod";
import prisma from "@/utils/prisma";
import { authActionAdmin } from "@/utils/safe-action";
import { revalidateTag } from "next/cache";

export const updateUser = authActionAdmin
  .use(async ({ next, ctx }) => {
    if (!ctx.isAdmin) {
      throw new ActionError("Doar adminii pot face aceasta actiune.");
    }
    return next();
  })
  .metadata({ actionName: "updateUser" })
  .schema(userSchema)
  .action(
    async ({
      parsedInput: { id, name, username, password, isAdmin, nodes },
      ctx: { userId, isAdmin: isUserAdmin },
    }) => {
      // Check if the current user is allowed to create an admin
      if (isAdmin && !isUserAdmin) {
        throw new Error("You can't create an admin user.");
      }

      console.log("id", id);

      // Check if the user exists
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new Error("Utilizatorul nu exista.");
      }

      // Check if the username is already taken
      const existingUsername = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUsername && existingUsername.id !== id) {
        throw new Error("Username-ul este deja folosit.");
      }

      // Hash the password
      let hashedPassword = existingUser.password;
      if (password) {
        hashedPassword = await hash(password, 12);
      }

      // Update the user
      await prisma.user.update({
        where: { id },
        data: {
          name,
          username,
          password: hashedPassword,
          isAdmin,
          nodes: {
            set: nodes.map((nodeId) => ({ id: nodeId })), // Connect existing nodes
          },
        },
      });

      // Revalidate the users cache tag
      revalidateTag("users");

      return { success: true, name };
    }
  );
