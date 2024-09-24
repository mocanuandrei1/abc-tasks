import { compare } from "bcryptjs";
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
          select: { id: true, username: true, name: true, password: true },
        });

        if (!user) throw new Error("Utilizatorul sau parola sunt gresite");

        const isValid = await compare(password, user.password);

        if (!isValid) throw new Error("Utilizatorul sau parola sunt gresite");

        const userData = {
          username: user.username,
          name: user.name,
          id: user.id,
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
        session.user.name = token.name;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
  },

  secret: process.env.AUTH_SECRET,
});
