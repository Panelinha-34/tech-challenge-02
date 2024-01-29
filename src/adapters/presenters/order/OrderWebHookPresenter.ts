import { FastifyReply, FastifyRequest } from "fastify";

import { orderWebhookPayloadSchema } from "@/adapters/controllers/order/schema/OrderWebHookSchema";
import {
  OrderWebHookUseCaseRequestDTO,
  OrderWebHookUseCaseResponseDTO,
} from "@/core/useCases/order/dto/OrderWebHookUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class UpdateOrderStatusPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      OrderWebHookUseCaseRequestDTO,
      OrderWebHookUseCaseResponseDTO,
      void
    >
{
  convertToUseCaseDTO(req: FastifyRequest): OrderWebHookUseCaseRequestDTO {
    const { resource, topic } = orderWebhookPayloadSchema.parse(req.body);

    return {
      id,
      status,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
  sendResponse(res: FastifyReply, response: OrderWebHookUseCaseResponseDTO) {
    return res.status(200).send();
  }
}
