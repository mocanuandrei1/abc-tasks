import { createSafeActionClient } from "next-safe-action";
import { getSession } from "./get-session";
import { z } from "zod";

export const actionClient = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  // Define logging middleware.
}).use(async ({ next, clientInput, metadata }) => {
  console.log("LOGGING MIDDLEWARE");

  const startTime = performance.now();

  // Here we await the action execution.
  const result = await next();

  const endTime = performance.now();

  console.log("Result ->", result);
  console.log("Client input ->", clientInput);
  console.log("Metadata ->", metadata);
  console.log("Action execution took", endTime - startTime, "ms");

  // And then return the result of the awaited action.
  return result;
});

export const authActionClient = actionClient
  // Define authorization middleware.
  .use(async ({ next }) => {
    const session = await getSession();

    if (!session) {
      throw new Error("Session not found!");
    }

    const userId = session.user.id;

    if (!userId) {
      throw new Error("Session is not valid!");
    }

    return next({ ctx: { userId } });
  });

export const authActionAdmin = actionClient
  // Define authorization middleware.
  .use(async ({ next }) => {
    const session = await getSession();

    if (!session) {
      throw new Error("Session not found!");
    }

    const userId = session.user.id;

    if (!userId) {
      throw new Error("Session is not valid!");
    }

    const isAdmin = session.user.isAdmin;

    if (!isAdmin) {
      throw new Error("Only admins can do this action.");
    }

    return next({ ctx: { userId, isAdmin } });
  });
