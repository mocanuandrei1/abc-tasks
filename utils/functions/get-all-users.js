import prisma from "@/utils/prisma";
import { unstable_cache } from "next/cache";

export const preload = () => {
  void getAllUsers();
};

export const getAllUsers = unstable_cache(
  async () => {
    const users = prisma.user.findMany({
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

    if (!users) {
      throw new Error("Nu exista utilizatori in baza de date.");
    }

    return users;
  },
  ["users"],
  { tags: ["users"] }
);
