import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "@/drivers/webserver/utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "@/drivers/webserver/utils/generateSchemaFromSampleObject";

import { InactiveProductViewModel } from "../viewModel/InactiveProductViewModel";
import { tag } from "./constants";

export const inactiveProductPathParametersSchema = z.object({
  id: z.string(),
});

const responseExample: InactiveProductViewModel = {
  id: "1",
  name: "Sandwich 1",
  description: "Sandwich 1",
  active: false,
  price: 5,
  category: "SANDWICH",
  createdAt: "2021-01-01T00:00:00.000Z",
  updatedAt: "2021-01-01T00:00:00.000Z",
};

export const inactiveProductDocSchema = {
  tags: [tag],
  description: `Inactive ${tag}`,
  params: convertZodSchemaToDocsTemplate({
    schema: inactiveProductPathParametersSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
