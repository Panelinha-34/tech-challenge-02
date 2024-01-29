import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "@/drivers/webserver/utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "@/drivers/webserver/utils/generateSchemaFromSampleObject";

import { GetClientsViewModel } from "../viewModels/GetClientsViewModel";
import { tag } from "./constants";

export const getClientsQueryParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(20),
});

const responseExample: GetClientsViewModel = {
  data: [
    {
      id: "123",
      name: "John",
      email: "john.doe@test.com",
      taxVat: "123456789",
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

export const getClientsDocSchema = {
  tags: [tag],
  description: `Get ${tag}s`,
  querystring: convertZodSchemaToDocsTemplate({
    schema: getClientsQueryParamsSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
