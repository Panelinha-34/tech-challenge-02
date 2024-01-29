import { DomainEvents } from "@/core/domain/base/events/DomainEvents";
import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Order } from "@/core/domain/entities/Order";
import { OrderStatus } from "@/core/domain/valueObjects/OrderStatus";
import { IOrderComboItemRepository } from "@/core/interfaces/repositories/IOrderComboItemRepository";
import { IOrderRepository } from "@/core/interfaces/repositories/IOrderRepository";
import { prisma } from "@/drivers/db/prisma/config/prisma";

import { PrismaOrderToDomainConverter } from "./converters/PrismaOrderToDomainConverter";

export class PrismaOrderRepository implements IOrderRepository {
  constructor(private orderComboItemRepository: IOrderComboItemRepository) {}

  async findMany(
    { page, size }: PaginationParams,
    status?: OrderStatus,
    clientId?: string
  ): Promise<PaginationResponse<Order>> {
    const where = {
      status: status ? status.name : undefined,
      client_id: clientId,
    };

    const totalItems = await prisma.order.count({
      where,
    });
    const totalPages = Math.ceil(totalItems / size);

    const data = await prisma.order.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
    });

    return new PaginationResponse<Order>({
      data: data.map((c) => PrismaOrderToDomainConverter.convert(c)),
      totalItems,
      currentPage: page,
      pageSize: size,
      totalPages,
    });
  }

  async findManyByStatuses(statuses: OrderStatus[]): Promise<Order[]> {
    const where = {
      status: {
        in: statuses.map((s) => s.name),
      },
    };

    return prisma.order
      .findMany({
        where,
      })
      .then((data) => data.map((c) => PrismaOrderToDomainConverter.convert(c)));
  }

  async findManyByClientId(
    { page, size }: PaginationParams,
    clientId: string
  ): Promise<PaginationResponse<Order>> {
    const totalItems = await prisma.order.count({
      where: {
        client_id: clientId,
      },
    });
    const totalPages = Math.ceil(totalItems / size);

    const data = await prisma.order.findMany({
      where: {
        client_id: clientId,
      },
      skip: (page - 1) * size,
      take: size,
    });

    return new PaginationResponse<Order>({
      data: data.map((c) => PrismaOrderToDomainConverter.convert(c)),
      totalItems,
      currentPage: page,
      pageSize: size,
      totalPages,
    });
  }

  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      return null;
    }

    const combos = await this.orderComboItemRepository.findManyByOrderId(id);

    return PrismaOrderToDomainConverter.convert(order, combos);
  }

  async create(order: Order): Promise<Order> {
    const createdOrder = await prisma.order
      .create({
        data: {
          id: order.id.toString(),
          status: order.status.name,
          payment_method: order.paymentMethod.name,
          payment_details: order.paymentDetails,
          client_id: order.clientId?.toString(),
          visitor_name: order.visitorName,
          total_price: order.totalPrice,
          created_at: order.createdAt,
          updated_at: order.updatedAt,
        },
      })
      .then((c) => PrismaOrderToDomainConverter.convert(c));

    await this.orderComboItemRepository.createMany(order.combos.getItems());

    DomainEvents.dispatchEventsForAggregate(order.id);

    return createdOrder;
  }

  async update(order: Order): Promise<Order> {
    const updatedOrder = await prisma.order
      .update({
        where: {
          id: order.id.toString(),
        },
        data: {
          status: order.status.name,
          updated_at: order.updatedAt,
        },
      })
      .then((c) => PrismaOrderToDomainConverter.convert(c));

    DomainEvents.dispatchEventsForAggregate(order.id);

    return updatedOrder;
  }
}
