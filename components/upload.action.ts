"use server";

import { put } from "@vercel/blob";
import { z } from "zod";
import userAction, { ActionError } from "./safe-action";

const uploadImageAction = userAction(
  z.instanceof(FormData),
  async (formData: FormData) => {
    const file = formData.get("file") as File;

    if (!file) {
      throw new ActionError("File not found");
    }

    const name = file.name;

    const result = await put(name, file, {
      access: "public",
    });

    return result;
  }
);

export default uploadImageAction;
