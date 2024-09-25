import { compare, hash } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./utils/prisma";
import { loginSchema } from "./utils/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { username, password } = await loginSchema.parse(credentials);

        if (!username || !password)
          throw new Error("Utilizatorul si parola sunt obligatorii");

        const user = await prisma.user.findUnique({
          where: { username },
          select: {
            id: true,
            username: true,
            name: true,
            password: true,
            isAdmin: true,
            nodes: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });

        if (!user) throw new Error("Utilizatorul sau parola sunt gresite");

        const isValid = await compare(password, user.password);

        if (!isValid) throw new Error("Utilizatorul sau parola sunt gresite");

        const userData = {
          username: user.username,
          name: user.name,
          id: user.id,
          isAdmin: user.isAdmin,
          nodes: user.nodes,
        };

        return userData;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.name = token.name;
        session.user.isAdmin = token.isAdmin;
        session.user.nodes = token.nodes;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.name = user.name;
        token.isAdmin = user.isAdmin;
        token.nodes = user.nodes;
      }
      return token;
    },
  },

  secret: process.env.AUTH_SECRET,
});
