import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "@/drivers/webserver/utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "@/drivers/webserver/utils/generateSchemaFromSampleObject";

import { GetCombosViewModel } from "../viewModels/GetCombosViewModel";
import { tag } from "./constants";

export const getCombosQueryParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(20),
});

const responseExample: GetCombosViewModel = {
  data: [
    {
      id: "123",
      name: "John",
      description: "description",
      price: 12,
      createdAt: "2021-10-26",
      updatedAt: "2021-10-27",
    },
  ],
  pagination: {
    totalItems: 1,
    currentPage: 1,
    pageSize: 20,
    totalPages: 1,
  },
};

export const getCombosDocSchema = {
  tags: [tag],
  description: `List ${tag}s`,
  querystring: convertZodSchemaToDocsTemplate({
    schema: getCombosQueryParamsSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
