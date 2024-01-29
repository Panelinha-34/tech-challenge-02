import { z } from "zod";

import { generateSchemaFromSampleObject } from "@/drivers/webserver/utils/generateSchemaFromSampleObject";

import { GetOrdersQueueFormatedViewModel } from "../viewModel/GetOrdersQueueFormatedViewModel";
import { tag } from "./constants";

export const getOrdersQueueFormatedQueryParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(20),
});

const responseExample: GetOrdersQueueFormatedViewModel = {
  data: [
    {
      number: "1",
      status: "pending",
      clientName: "123",
    },
  ],
  pagination: {
    totalItems: 1,
    currentPage: 1,
    pageSize: 20,
    totalPages: 1,
  },
};

export const getOrdersQueueFormatedDocSchema = {
  tags: [tag],
  description: `List ${tag}s formatted to queue`,
  querystring: {
    type: "object",
    properties: {
      page: { type: "number" },
      pageSize: { type: "number" },
    },
  },
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
