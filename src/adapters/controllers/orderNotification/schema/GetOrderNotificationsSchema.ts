import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "@/drivers/webserver/utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "@/drivers/webserver/utils/generateSchemaFromSampleObject";

import { GetOrderNotificationsViewModel } from "../viewModel/GetOrderNotificationsViewModel";
import { tag } from "./constants";

export const getOrderNotificationsQueryParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(20),
});

const responseExample: GetOrderNotificationsViewModel = {
  data: [
    {
      id: "123",
      orderId: "123",
      clientId: "123",
      status: "PENDING",
      message: "Your order is pending",
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

export const getOrderNotificationsDocSchema = {
  tags: [tag],
  description: `List ${tag}`,
  querystring: convertZodSchemaToDocsTemplate({
    schema: getOrderNotificationsQueryParamsSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
