import { z } from "zod";

import { CategoriesEnum } from "@/core/domain/enums/CategoriesEnum";
import { convertZodSchemaToDocsTemplate } from "@/drivers/webserver/utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "@/drivers/webserver/utils/generateSchemaFromSampleObject";

import { EditProductViewModel } from "../viewModel/EditProductViewModel";
import { tag } from "./constants";

export const editProductPathParametersSchema = z.object({
  id: z.string(),
});

export const editProductPayloadSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  category: z.nativeEnum(CategoriesEnum).optional(),
  price: z.number().optional(),
});

const responseExample: EditProductViewModel = {
  id: "1",
  name: "Sandwich 1",
  description: "Sandwich 1",
  price: 5,
  category: "SANDWICH",
  createdAt: "2021-01-01T00:00:00.000Z",
  updatedAt: "2021-01-01T00:00:00.000Z",
};

export const editProductDocSchema = {
  tags: [tag],
  description: `Edit ${tag}`,
  params: convertZodSchemaToDocsTemplate({
    schema: editProductPathParametersSchema,
  }),
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      description: { type: "string" },
      price: { type: "number" },
      category: { type: "string", enum: Object.values(CategoriesEnum) },
    },
  },
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
