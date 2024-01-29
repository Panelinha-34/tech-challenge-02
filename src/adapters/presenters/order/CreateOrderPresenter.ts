/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { FastifyReply, FastifyRequest } from "fastify";

import { createOrderPayloadSchema } from "@/adapters/controllers/order/schema/CreateOrderSchema";
import { MinimumResourcesNotReached } from "@/core/domain/base/errors/useCases/MinimumResourcesNotReached";
import {
  CreateOrderUseCaseRequestDTO,
  CreateOrderUseCaseResponseDTO,
} from "@/core/useCases/order/dto/CreateOrderUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class CreateOrderPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      CreateOrderUseCaseRequestDTO,
      CreateOrderUseCaseResponseDTO
    >
{
  convertToUseCaseDTO(req: FastifyRequest): CreateOrderUseCaseRequestDTO {
    const parsedRequest = createOrderPayloadSchema.parse(req.body);

    return {
      ...parsedRequest,
    };
  }

  sendResponse(
    res: FastifyReply,
    _useCaseResponseModel: CreateOrderUseCaseResponseDTO
  ) {
    return res.status(201).send();
  }

  convertErrorResponse(error: Error, res: FastifyReply): FastifyReply {
    if (error instanceof MinimumResourcesNotReached) {
      return res.status(400).send({
        message: `Please inform the clientId or the visitorName`,
      });
    }

    return super.convertErrorResponse(error, res);
  }
}
