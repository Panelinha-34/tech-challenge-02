import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "@/drivers/webserver/utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "@/drivers/webserver/utils/generateSchemaFromSampleObject";

import { GetProductByIdViewModel } from "../viewModel/GetProductByIdViewModel";
import { tag } from "./constants";

export const getProductByIdQueryParamsSchema = z.object({
  id: z.string(),
});

const responseExample: GetProductByIdViewModel = {
  id: "1",
  name: "Sandwich 1",
  description: "Sandwich 1",
  active: true,
  price: 5,
  category: "SANDWICH",
  createdAt: "2021-01-01T00:00:00.000Z",
  updatedAt: "2021-01-01T00:00:00.000Z",
};

export const getProductByIdDocSchema = {
  tags: [tag],
  description: `Get ${tag} by id`,
  params: convertZodSchemaToDocsTemplate({
    schema: getProductByIdQueryParamsSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
