import { z } from "zod";

import { CategoriesEnum } from "@/core/domain/enums/CategoriesEnum";

import { tag } from "./constants";

export const createProductPayloadSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.nativeEnum(CategoriesEnum),
});

export const createProductDocSchema = {
  tags: [tag],
  description: `Create ${tag}`,
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      description: { type: "string" },
      price: { type: "number" },
      category: { type: "string", enum: Object.values(CategoriesEnum) },
    },
    required: ["name", "description", "price", "category"],
  },
};
