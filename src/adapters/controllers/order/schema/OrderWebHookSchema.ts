import { z } from "zod";

import { tag } from "./constants";

const urlNumberExtractor = z
  .string()
  .refine((value) => /\d+$/.test(value), {
    message: "Resource URL must end with a number.",
  })
  .transform((value) => {
    const matches = value.match(/\d+$/);
    return matches![0];
  });

export const orderWebhookPayloadSchema = z.object({
  resource: urlNumberExtractor,
  topic: z.literal("merchant_order"),
});

export const orderWebHookDocSchema = {
  tags: [tag],
  description: `${tag} webhook`,
  body: {
    type: "object",
    properties: {
      resource: { type: "string" },
      topic: { type: "string" },
    },
  },
};
