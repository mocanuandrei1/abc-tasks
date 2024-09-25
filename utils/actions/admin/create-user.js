"use server";

import { hash } from "bcryptjs";

import { userSchema } from "@/utils/zod";

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
  .schema(userSchema)
  .action(
    async ({
      parsedInput: { name, username, password, isAdmin, nodes },
      ctx: { userId, isAdmin: isUserAdmin },
    }) => {
      if (isAdmin && !isUserAdmin) {
        throw new ActionError("You can't create an admin user.");
      }

      const existingUser = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUser) {
        throw new ActionError("Username-ul este deja folosit.");
      }

      const hashedPassword = await hash(password, 12);

      await prisma.user.create({
        data: {
          name,
          username,
          password: hashedPassword,
          isAdmin,
          nodes: {
            create: {},
          },
        },
      });

      revalidateTag("users");
      return { success: true, name: name };
    }
  );
