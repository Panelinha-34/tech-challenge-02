import { z } from "zod";

import { CategoriesEnum } from "@/core/domain/enums/CategoriesEnum";
import { generateSchemaFromSampleObject } from "@/drivers/webserver/utils/generateSchemaFromSampleObject";

import { GetProductsViewModel } from "../viewModel/GetProductsViewModel";
import { tag } from "./constants";

export const getProductsQueryParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(20),
  category: z.nativeEnum(CategoriesEnum).optional(),
  includeInactive: z.boolean().default(false),
});

const responseExample: GetProductsViewModel = {
  data: [
    {
      id: "1",
      name: "Product 1",
      description: "Description 1",
      active: true,
      price: 100,
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

export const getProductsDocSchema = {
  tags: [tag],
  description: `List ${tag}s`,
  querystring: {
    type: "object",
    properties: {
      page: { type: "number" },
      pageSize: { type: "number" },
      category: { type: "string", enum: Object.values(CategoriesEnum) },
      includeInactive: { type: "boolean" },
    },
  },
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
