import prisma from "@/utils/prisma";
import { unstable_cache } from "next/cache";

export const preload = (id) => {
  void getUser(id);
};

export const getUser = unstable_cache(
  async (id) => {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        username: true,
        isAdmin: true,
        createdAt: true,
        nodes: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("Nu exista utilizatorul in baza de date.");
    }

    return user;
  },
  ["users"],
  { tags: ["users"] }
);
