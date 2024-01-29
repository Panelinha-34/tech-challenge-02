import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "@/drivers/webserver/utils/convertZodSchemaToDocsTemplate";

import { tag } from "./constants";

export const createClientPayloadSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  taxVat: z.string(),
});

export const createClientDocSchema = {
  tags: [tag],
  description: `Create ${tag}`,
  body: convertZodSchemaToDocsTemplate({
    schema: createClientPayloadSchema,
  }),
};
