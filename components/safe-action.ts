import { auth } from "@clerk/nextjs/server";
import { createSafeActionClient } from "next-safe-action";

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ActionError";
  }
}

const handleReturnedServerError = (error: Error) => {
  if (error instanceof ActionError) {
    return error.message;
  }
  return "An unexpected error occurred";
};

export const action = createSafeActionClient({
  handleReturnedServerError: handleReturnedServerError,
});

const userAction = createSafeActionClient({
  handleReturnedServerError: handleReturnedServerError,
  middleware: async () => {
    const { userId } = auth();

    if (!userId) {
      throw new ActionError("Vous devriez vous connecter");
    }

    return { userId };
  },
});
export default userAction;
