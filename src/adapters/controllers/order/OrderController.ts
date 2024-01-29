import { FastifyReply, FastifyRequest } from "fastify";

import { CreateOrderPresenter } from "@/adapters/presenters/order/CreateOrderPresenter";
import { GetOrderByIdPresenter } from "@/adapters/presenters/order/GetOrderByIdPresenter";
import { GetOrdersPresenter } from "@/adapters/presenters/order/GetOrdersPresenter";
import { GetOrdersQueueFormatedPresenter } from "@/adapters/presenters/order/GetOrdersQueueFormatedPresenter";
import { OrderWebHookPresenter } from "@/adapters/presenters/order/OrderWebHookPresenter";
import { UpdateOrderStatusPresenter } from "@/adapters/presenters/order/UpdateOrderStatusPresenter";
import { IOrderUseCase } from "@/core/useCases/order/IOrderUseCase";

import { GetOrdersViewModel } from "./viewModel/GetOrdersViewModel";
import { UpdateOrderStatusViewModel } from "./viewModel/UpdateOrderStatusViewModel";

export class OrderController {
  constructor(
    private orderUseCase: IOrderUseCase,
    private getOrdersPresenter: GetOrdersPresenter,
    private getOrdersQueueFormatedPresenter: GetOrdersQueueFormatedPresenter,
    private createOrderPresenter: CreateOrderPresenter,
    private getOrderByIdPresenter: GetOrderByIdPresenter,
    private updateOrderStatusPresenter: UpdateOrderStatusPresenter,
    private orderWebHookPresenter: OrderWebHookPresenter
  ) {}

  async getOrders(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetOrdersViewModel> {
    return this.orderUseCase
      .getOrders(this.getOrdersPresenter.convertToUseCaseDTO(req))
      .then((response) => this.getOrdersPresenter.sendResponse(res, response))
      .catch((error) =>
        this.getOrdersPresenter.convertErrorResponse(error, res)
      );
  }

  async getOrdersQueueFormated(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetOrdersViewModel> {
    return this.orderUseCase
      .getOrdersQueueFormated(
        this.getOrdersQueueFormatedPresenter.convertToUseCaseDTO(req)
      )
      .then((response) =>
        this.getOrdersQueueFormatedPresenter.sendResponse(res, response)
      )
      .catch((error) =>
        this.getOrdersQueueFormatedPresenter.convertErrorResponse(error, res)
      );
  }

  async getOrderById(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetOrdersViewModel> {
    return this.orderUseCase
      .getOrderById(this.getOrderByIdPresenter.convertToUseCaseDTO(req))
      .then((response) =>
        this.getOrderByIdPresenter.sendResponse(res, response)
      )
      .catch((error) =>
        this.getOrderByIdPresenter.convertErrorResponse(error, res)
      );
  }

  async createOrder(req: FastifyRequest, res: FastifyReply): Promise<void> {
    return this.orderUseCase
      .createOrder(this.createOrderPresenter.convertToUseCaseDTO(req))
      .then((response) => this.createOrderPresenter.sendResponse(res, response))
      .catch((error) =>
        this.createOrderPresenter.convertErrorResponse(error, res)
      );
  }

  async updateOrderStatus(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<UpdateOrderStatusViewModel> {
    return this.orderUseCase
      .updateOrderStatus(
        this.updateOrderStatusPresenter.convertToUseCaseDTO(req)
      )
      .then((response) =>
        this.updateOrderStatusPresenter.sendResponse(res, response)
      )
      .catch((error) =>
        this.updateOrderStatusPresenter.convertErrorResponse(error, res)
      );
  }

  async webhook(req: FastifyRequest, res: FastifyReply): Promise<void> {
    return this.orderUseCase
      .orderWebhook(this.orderWebHookPresenter.convertToUseCaseDTO(req))
      .then(() => this.orderWebHookPresenter.sendResponse(res))
      .catch((error) =>
        this.orderWebHookPresenter.convertErrorResponse(error, res)
      );
  }
}
