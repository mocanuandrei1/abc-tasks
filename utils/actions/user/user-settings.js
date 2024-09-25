"use server";

import { hash } from "bcryptjs";
import prisma from "@/utils/prisma";
import { authActionClient } from "@/utils/safe-action";
import { revalidateTag } from "next/cache";
import { userSchema } from "@/utils/zod";

export const userSettings = authActionClient
  .use(async ({ next, ctx }) => {
    // `userId` comes from the context set in the previous middleware function.

    if (!ctx.userId) {
      throw new ActionError("Only admins can do this action.");
    }

    // Here we pass the same untouched context (`userId`) to the next function, since we don't need
    // to add data to the context here.
    return next();
  })
  .metadata({ actionName: "userSettings" })
  .schema(userSchema)
  .action(
    async ({
      parsedInput: { name, username, password, id },
      ctx: { userId },
    }) => {
      // Check if the user id is the same as the one in the context.
      if (userId !== id) {
        throw new ActionError("Poti sa editezi doar propriul cont.");
      }

      // Check if the user exists.
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new ActionError("Utilizatorul nu exista.");
      }

      // Check if the username is unique.
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUser && existingUser.id !== id) {
        throw new ActionError("Username-ul este deja folosit.");
      }

      // Hash the password if it's provided.
      let hashedPassword = user.password;
      if (password) {
        hashedPassword = await hash(password, 12);
      }

      // Update the user.
      await prisma.user.update({
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

      revalidateTag("users");
      return { success: true, name: name };
    }
  );
