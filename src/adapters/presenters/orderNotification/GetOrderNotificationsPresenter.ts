import { FastifyReply, FastifyRequest } from "fastify";

import { getOrdersQueryParamsSchema } from "@/adapters/controllers/order/schema/GetOrdersSchema";
import { GetOrderNotificationsViewModel } from "@/adapters/controllers/orderNotification/viewModel/GetOrderNotificationsViewModel";
import { PaginationParams } from "@/core/domain/base/PaginationParams";
import {
  GetOrderNotificationsUseCaseRequestDTO,
  GetOrderNotificationsUseCaseResponseDTO,
} from "@/core/useCases/orderNotification/dto/GetOrderNotificationsUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class GetOrderNotificationsPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      GetOrderNotificationsUseCaseRequestDTO,
      GetOrderNotificationsUseCaseResponseDTO,
      GetOrderNotificationsViewModel
    >
{
  convertToUseCaseDTO(
    req: FastifyRequest
  ): GetOrderNotificationsUseCaseRequestDTO {
    const { page, pageSize } = getOrdersQueryParamsSchema.parse(req.query);

    const params = new PaginationParams(page, pageSize);

    return {
      params,
    };
  }

  convertToViewModel(
    model: GetOrderNotificationsUseCaseResponseDTO
  ): GetOrderNotificationsViewModel {
    return model.paginationResponse.toResponse((orderNotification) => ({
      id: orderNotification.id.toString(),
      orderId: orderNotification.orderId.toString(),
      clientId: orderNotification.clientId.toString(),
      status: orderNotification.status.name,
      message: orderNotification.message,
      createdAt: orderNotification.createdAt.toISOString(),
      updatedAt: orderNotification.updatedAt?.toISOString(),
    }));
  }

  sendResponse(
    res: FastifyReply,
    response: GetOrderNotificationsUseCaseResponseDTO
  ) {
    return res.status(200).send(this.convertToViewModel(response));
  }
}
