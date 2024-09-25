"use server";

import { signIn } from "@/auth";
import { actionClient } from "@/utils/safe-action";
import { loginSchema } from "@/utils/zod";
import { isRedirectError } from "next/dist/client/components/redirect";

export const login = actionClient
  .metadata({ actionName: "login" })
  .schema(loginSchema)
  .action(async ({ parsedInput: { username, password } }) => {
    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirectTo: "/dashboard",
      });

      return { success: true, data: result };
    } catch (error) {
      console.error("Caught error:", error);
      if (isRedirectError(error)) throw error;

      if (error) {
        throw new Error("Utilizatorul sau parola sunt gresite");
      }
    }
  });
