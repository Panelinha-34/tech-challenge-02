import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "@/drivers/webserver/utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "@/drivers/webserver/utils/generateSchemaFromSampleObject";

import { GetClientByIdViewModel } from "../viewModels/GetClientByIdViewModel";
import { tag } from "./constants";

export const getClientByIdQueryParamsSchema = z.object({
  id: z.string(),
});

const responseExample: GetClientByIdViewModel = {
  id: "123",
  name: "John",
  email: "john@example.com",
  taxVat: "456",
  createdAt: "2023-10-26",
  updatedAt: "2023-10-27",
};

export const getClientByIdDocSchema = {
  tags: [tag],
  description: `Get ${tag} by id`,
  params: convertZodSchemaToDocsTemplate({
    schema: getClientByIdQueryParamsSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
