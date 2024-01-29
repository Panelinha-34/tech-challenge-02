import { FastifyReply, FastifyRequest } from "fastify";

import {
  updateOrderStatusPathParametersSchema,
  updateOrderStatusPayloadSchema,
} from "@/adapters/controllers/order/schema/UpdateOrderStatusSchema";
import { UpdateOrderStatusViewModel } from "@/adapters/controllers/order/viewModel/UpdateOrderStatusViewModel";
import { UnsupportedArgumentValueError } from "@/core/domain/base/errors/entities/UnsupportedArgumentValueError";
import {
  UpdateOrderStatusUseCaseRequestDTO,
  UpdateOrderStatusUseCaseResponseDTO,
} from "@/core/useCases/order/dto/UpdateOrderStatusUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class UpdateOrderStatusPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      UpdateOrderStatusUseCaseRequestDTO,
      UpdateOrderStatusUseCaseResponseDTO,
      UpdateOrderStatusViewModel
    >
{
  convertToUseCaseDTO(req: FastifyRequest): UpdateOrderStatusUseCaseRequestDTO {
    const { id } = updateOrderStatusPathParametersSchema.parse(req.params);

    const { status } = updateOrderStatusPayloadSchema.parse(req.body);

    return {
      id,
      status,
    };
  }

  convertToViewModel(
    model: UpdateOrderStatusUseCaseResponseDTO
  ): UpdateOrderStatusViewModel {
    return {
      id: model.order.id.toString(),
      status: model.order.status.name,
      clientId: model.order.clientId?.toString(),
      visitorName: model.order.visitorName,
      paymentMethod: model.order.paymentMethod.name,
      totalPrice: model.order.totalPrice,
      createdAt: model.order.createdAt.toISOString(),
      updatedAt: model.order.updatedAt?.toISOString(),
    };
  }

  sendResponse(
    res: FastifyReply,
    response: UpdateOrderStatusUseCaseResponseDTO
  ) {
    return res.status(200).send(this.convertToViewModel(response));
  }

  convertErrorResponse(error: Error, res: FastifyReply): FastifyReply {
    if (error instanceof UnsupportedArgumentValueError) {
      return res.status(400).send({
        message: `The following status is not supported comparing with the current order status`,
      });
    }

    return super.convertErrorResponse(error, res);
  }
}
