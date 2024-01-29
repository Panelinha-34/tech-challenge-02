import { FastifyReply, FastifyRequest } from "fastify";

import { GetOrderNotificationsPresenter } from "@/adapters/presenters/orderNotification/GetOrderNotificationsPresenter";
import { IOrderNotificationUseCase } from "@/core/useCases/orderNotification/IOrderNotificationUseCase";

import { GetOrderNotificationsViewModel } from "./viewModel/GetOrderNotificationsViewModel";

export class OrderNotificationController {
  constructor(
    private orderNotificationUseCase: IOrderNotificationUseCase,
    private getOrderNotificationsPresenter: GetOrderNotificationsPresenter
  ) {}

  async getOrderNotifications(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetOrderNotificationsViewModel> {
    return this.orderNotificationUseCase
      .getNotifications(
        this.getOrderNotificationsPresenter.convertToUseCaseDTO(req)
      )
      .then((response) =>
        this.getOrderNotificationsPresenter.sendResponse(res, response)
      )
      .catch((error) =>
        this.getOrderNotificationsPresenter.convertErrorResponse(error, res)
      );
  }
}
