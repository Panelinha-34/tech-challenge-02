/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

import { env } from "config/env";

import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { UnsupportedArgumentValueError } from "@/core/domain/base/errors/entities/UnsupportedArgumentValueError";
import { MinimumResourcesNotReached } from "@/core/domain/base/errors/useCases/MinimumResourcesNotReached";
import { ResourceNotFoundError } from "@/core/domain/base/errors/useCases/ResourceNotFoundError";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Client } from "@/core/domain/entities/Client";
import { Combo } from "@/core/domain/entities/Combo";
import { Order } from "@/core/domain/entities/Order";
import { OrderComboItem } from "@/core/domain/entities/OrderComboItem";
import { OrderComboItemList } from "@/core/domain/entities/OrderComboItemList";
import { Product } from "@/core/domain/entities/Product";
import { OrderStatusEnum } from "@/core/domain/enums/OrderStatusEnum";
import { PaymentMethodEnum } from "@/core/domain/enums/PaymentMethodEnum";
import { OrderStatus } from "@/core/domain/valueObjects/OrderStatus";
import { PaymentMethod } from "@/core/domain/valueObjects/PaymentMethod";
import { IClientRepository } from "@/core/interfaces/repositories/IClientRepository";
import { IComboRepository } from "@/core/interfaces/repositories/IComboRepository";
import { IOrderRepository } from "@/core/interfaces/repositories/IOrderRepository";
import { IProductRepository } from "@/core/interfaces/repositories/IProductRepository";
import { IPaymentService } from "@/core/interfaces/services/IPaymentService";

import { IComboUseCase } from "../combo/IComboUseCase";
import {
  CreateOrderUseCaseRequestDTO,
  CreateOrderUseCaseResponseDTO,
} from "./dto/CreateOrderUseCaseDTO";
import {
  GetOrderByIdUseCaseRequestDTO,
  GetOrderByIdUseCaseResponseDTO,
} from "./dto/GetOrderByIdUseCaseDTO";
import { GetOrdersQueueFormatedUseCaseRequestDTO } from "./dto/GetOrdersQueueFormatedUseCaseDTO";
import {
  GetOrdersUseCaseRequestDTO,
  GetOrdersUseCaseResponseDTO,
} from "./dto/GetOrdersUseCaseDTO";
import { OrderWebHookUseCaseRequestDTO } from "./dto/OrderWebHookUseCaseDTO";
import {
  UpdateOrderStatusUseCaseRequestDTO,
  UpdateOrderStatusUseCaseResponseDTO,
} from "./dto/UpdateOrderStatusUseCaseDTO";
import { IOrderUseCase } from "./IOrderUseCase";

export class OrderUseCase implements IOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private clientRepository: IClientRepository,
    private productRepository: IProductRepository,
    private comboRepository: IComboRepository,

    private paymentService: IPaymentService,

    private comboUseCase: IComboUseCase
  ) {}

  async orderWebhook({
    platformOrderId,
  }: OrderWebHookUseCaseRequestDTO): Promise<void> {
    const { orderId, status } =
      await this.paymentService.getOrderStatus(platformOrderId);

    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new ResourceNotFoundError(Order.name);
    }

    if (
      status === "paid" &&
      order.status.name !== OrderStatusEnum.PENDING_PAYMENT
    ) {
      order.status = new OrderStatus({ name: OrderStatusEnum.RECEIVED });

      await this.orderRepository.update(order);
    }
  }

  async getOrders({
    params,
    status,
    clientId,
  }: GetOrdersUseCaseRequestDTO): Promise<GetOrdersUseCaseResponseDTO> {
    if (
      status &&
      !Object.keys(OrderStatusEnum)
        .map((e) => e.toLowerCase())
        .includes(status.toLowerCase())
    ) {
      throw new UnsupportedArgumentValueError(OrderStatus.name);
    }

    await this.validateClient(clientId);

    const orderStatus = status
      ? new OrderStatus({ name: status as OrderStatusEnum })
      : undefined;

    const paginationResponse = await this.orderRepository.findMany(
      params,
      orderStatus,
      clientId
    );

    return { paginationResponse };
  }

  async getOrdersQueueFormated({
    params,
  }: GetOrdersQueueFormatedUseCaseRequestDTO): Promise<GetOrdersUseCaseResponseDTO> {
    const statusesToSearch = [
      new OrderStatus({ name: OrderStatusEnum.READY }),
      new OrderStatus({ name: OrderStatusEnum.IN_PREPARATION }),
      new OrderStatus({ name: OrderStatusEnum.RECEIVED }),
    ];

    const orders =
      await this.orderRepository.findManyByStatuses(statusesToSearch);

    const orderOfStatuses = statusesToSearch.map((status) => status.name);

    const orderedOrders = orders
      .sort((a, b) => {
        const indexA = orderOfStatuses.indexOf(a.status.name);
        const indexB = orderOfStatuses.indexOf(b.status.name);

        if (indexA - indexB !== 0) {
          return indexA - indexB;
        }

        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();

        return dateA - dateB;
      })
      .slice((params.page - 1) * params.size, params.page * params.size);

    const paginationResponse = new PaginationResponse<Order>({
      data: orderedOrders,
      totalItems: orders.length,
      currentPage: params.page,
      pageSize: params.size,
      totalPages: Math.ceil(orders.length / params.size),
    });

    return {
      paginationResponse,
    };
  }

  async getOrderById({
    id,
  }: GetOrderByIdUseCaseRequestDTO): Promise<GetOrderByIdUseCaseResponseDTO> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new ResourceNotFoundError(Order.name);
    }

    const orderCombos = order.combos.getItems();
    const combos = await this.comboRepository.findManyByIds(
      orderCombos.map((c) => c.comboId.toString())
    );

    return {
      order,
      orderCombos,
      combos,
    };
  }

  async createOrder({
    clientId,
    visitorName,
    combos,
    paymentMethod,
    paymentDetails,
  }: CreateOrderUseCaseRequestDTO): Promise<CreateOrderUseCaseResponseDTO> {
    this.validatePaymentMethod(paymentMethod);
    this.validateIfClientOrVisitorNameIsInformed(clientId, visitorName);
    await this.validateClient(clientId);

    let allProductIds: string[] = [];

    if (combos) {
      allProductIds = combos
        .map((c) => {
          const { sandwichId, dessertId, sideId, drinkId } = c;

          return [sandwichId, dessertId, sideId, drinkId];
        })
        .flat()
        .filter((p): p is string => !!p);
    }

    const productDetails =
      await this.productRepository.findManyByIds(allProductIds);

    const notFoundedProductsIds = allProductIds
      .filter((p) => !productDetails.find((pd) => pd.id.toString() === p))
      .map((p) => p.toString());

    if (notFoundedProductsIds.length) {
      throw new ResourceNotFoundError(Product.name, notFoundedProductsIds);
    }

    let createdCombos: {
      combo: Combo;
      calculatedPrice: number;
      annotation?: string;
      quantity: number;
    }[] = [];

    if (combos) {
      try {
        const createdCombosPromises = combos.map(async (comboToCreate) => {
          const { sandwichId, dessertId, sideId, drinkId } = comboToCreate;

          const { combo } = await this.comboUseCase.createCombo({
            sandwichId,
            dessertId,
            sideId,
            drinkId,
          });

          return {
            combo,
            calculatedPrice: combo.price * comboToCreate.quantity,
            annotation: comboToCreate.annotation,
            quantity: comboToCreate.quantity,
          };
        });

        createdCombos = await Promise.all(createdCombosPromises);
      } catch (error) {
        for (const createdCombo of createdCombos) {
          await this.comboUseCase.deleteCombo({
            id: createdCombo.combo.id.toString(),
          });
        }
        throw error;
      }
    }

    const totalPrice = createdCombos.reduce(
      (acc, combo) => acc + combo.calculatedPrice,
      0
    );

    const order = new Order({
      status: new OrderStatus({
        name: OrderStatusEnum.PENDING_PAYMENT,
      }),
      clientId: clientId ? new UniqueEntityId(clientId) : undefined,
      paymentMethod: new PaymentMethod({
        name: paymentMethod as PaymentMethodEnum,
      }),
      paymentDetails,
      visitorName,
      totalPrice,
    });

    const orderCombosToCreate = createdCombos.map(
      (combo) =>
        new OrderComboItem({
          comboId: combo.combo.id,
          annotation: combo.annotation,
          orderId: order.id,
          quantity: combo.quantity,
          totalPrice: combo.calculatedPrice,
        })
    );

    order.combos = new OrderComboItemList(orderCombosToCreate);

    if (env.MERCADO_PAGO_GENERATE_PAYMENT === "on") {
      const { qrCode } = await this.paymentService.createPayment(order);
      order.paymentDetails = qrCode;
    }

    const createdOrder = await this.orderRepository.create(order);

    return { order: createdOrder };
  }

  async updateOrderStatus(
    props: UpdateOrderStatusUseCaseRequestDTO
  ): Promise<UpdateOrderStatusUseCaseResponseDTO> {
    const { id, status } = props;

    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new ResourceNotFoundError(Order.name);
    }

    order.status = new OrderStatus({
      name: status as OrderStatusEnum,
    });

    const updatedOrder = await this.orderRepository.update(order);

    return { order: updatedOrder };
  }

  private async validateClient(clientId: string | undefined) {
    if (clientId) {
      const client = await this.clientRepository.findById(clientId);

      if (!client) {
        throw new ResourceNotFoundError(Client.name);
      }
    }
  }

  private validateIfClientOrVisitorNameIsInformed(
    clientId: string | undefined,
    visitorName: string | undefined
  ) {
    if (!clientId && !visitorName) {
      throw new MinimumResourcesNotReached(Client.name, [
        "clientId",
        "visitorName",
      ]);
    }
  }

  private validatePaymentMethod(paymentMethod: string) {
    if (
      paymentMethod &&
      !Object.keys(PaymentMethodEnum)
        .map((e) => e.toLowerCase())
        .includes(paymentMethod.toLowerCase())
    ) {
      throw new UnsupportedArgumentValueError(PaymentMethod.name);
    }
  }
}
