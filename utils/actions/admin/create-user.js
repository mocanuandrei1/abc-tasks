"use server";

import { hash } from "bcryptjs";
import { createUserSchema } from "@/utils/zod";
import prisma from "@/utils/prisma";
import { authActionAdmin } from "@/utils/safe-action";
import { revalidateTag } from "next/cache";

export const createUser = authActionAdmin
  .use(async ({ next, ctx }) => {
    if (!ctx.isAdmin) {
      throw new ActionError("Only admins can do this action.");
    }
    return next();
  })
  .metadata({ actionName: "createUser" })
  .schema(createUserSchema)
  .action(
    async ({
      parsedInput: { name, username, password, isAdmin, nodes },
      ctx: { userId, isAdmin: isUserAdmin },
    }) => {
      // Check if the current user is allowed to create an admin
      if (isAdmin && !isUserAdmin) {
        throw new Error("You can't create an admin user.");
      }

      // Check if the username is already taken
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUser) {
        throw new Error("Username-ul este deja folosit.");
      }

      // Hash the password
      const hashedPassword = await hash(password, 12);

      // Create the user and connect to the existing nodes by their IDs
      await prisma.user.create({
        data: {
          name,
          username,
          password: hashedPassword,
          isAdmin,
          nodes: {
            connect: nodes.map((nodeId) => ({ id: nodeId })), // Connect existing nodes
          },
        },
      });

      // Revalidate the users cache tag
      revalidateTag("users");

      return { success: true, name };
    }
  );
