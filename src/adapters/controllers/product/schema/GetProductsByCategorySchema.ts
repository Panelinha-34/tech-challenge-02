import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "@/drivers/webserver/utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "@/drivers/webserver/utils/generateSchemaFromSampleObject";

import { GetProductsByCategoryViewModel } from "../viewModel/GetProductsByCategoryViewModel";
import { tag } from "./constants";

export const getProductsByCategoryQueryParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(20),
});

export const getProductsByCategoryPathParametersSchema = z.object({
  category: z.string(),
});

const responseExample: GetProductsByCategoryViewModel = {
  data: [
    {
      id: "1",
      name: "Product 1",
      price: 100,
      active: true,
      description: "Description 1",
      category: "Category 1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  pagination: {
    totalItems: 1,
    currentPage: 1,
    pageSize: 20,
    totalPages: 1,
  },
};

export const getProductsByCategoryDocSchema = {
  tags: [tag],
  description: `List ${tag}s by category`,
  params: convertZodSchemaToDocsTemplate({
    schema: getProductsByCategoryPathParametersSchema,
  }),
  queryString: convertZodSchemaToDocsTemplate({
    schema: getProductsByCategoryQueryParamsSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
