import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "@/drivers/webserver/utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "@/drivers/webserver/utils/generateSchemaFromSampleObject";

import { EditClientViewModel } from "../viewModels/EditClientViewModel";
import { tag } from "./constants";

export const editClientPathParametersSchema = z.object({
  id: z.string(),
});

export const editClientPayloadSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
});

const responseExample: EditClientViewModel = {
  id: "123",
  name: "John",
  email: "john.doe@test.com",
  taxVat: "456",
  createdAt: "2023-10-26",
  updatedAt: "2023-10-27",
};

export const editClientDocSchema = {
  tags: [tag],
  description: `Edit ${tag}`,
  params: convertZodSchemaToDocsTemplate({
    schema: editClientPathParametersSchema,
  }),
  body: convertZodSchemaToDocsTemplate({
    schema: editClientPayloadSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
