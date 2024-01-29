import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "@/drivers/webserver/utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "@/drivers/webserver/utils/generateSchemaFromSampleObject";

import { GetComboByIdViewModel } from "../viewModels/GetComboByIdViewModel";
import { tag } from "./constants";

export const getComboByIdPathParamsSchema = z.object({
  id: z.string(),
});

const responseExample: GetComboByIdViewModel = {
  id: "1",
  name: "Combo 1",
  description: "Combo 1",
  price: 10,
  createdAt: "2021-01-01T00:00:00.000Z",
  updatedAt: "2021-01-01T00:00:00.000Z",
  products: [
    {
      id: "1",
      name: "Sandwich 1",
      description: "Sandwich 1",
      price: 5,
      category: "SANDWICH",
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
    },
  ],
};

export const getComboByIdDocSchema = {
  tags: [tag],
  description: `Get ${tag}`,
  params: convertZodSchemaToDocsTemplate({
    schema: getComboByIdPathParamsSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
