import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "@/drivers/webserver/utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "@/drivers/webserver/utils/generateSchemaFromSampleObject";

import { CheckClientByTaxvatViewModel } from "../viewModels/CheckClientByTaxvatViewModel";
import { tag } from "./constants";

export const checkClientByTaxvatQueryParamsSchema = z.object({
  taxvat: z.string(),
});

const responseExample: CheckClientByTaxvatViewModel = {
  exist: true,
};

export const checkClientByTaxvatDocSchema = {
  tags: [tag],
  description: `Check if there is registered ${tag} with the given taxvat.`,
  querystring: convertZodSchemaToDocsTemplate({
    schema: checkClientByTaxvatQueryParamsSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
