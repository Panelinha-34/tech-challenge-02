import { FastifyInstance } from "fastify";

import { OrderController } from "@/adapters/controllers/order/OrderController";
import { createOrderDocSchema } from "@/adapters/controllers/order/schema/CreateOrderSchema";
import { getOrderByIdDocSchema } from "@/adapters/controllers/order/schema/GetOrderByIdSchema";
import { getOrdersQueueFormatedDocSchema } from "@/adapters/controllers/order/schema/GetOrdersQueueFormatedSchema";
import { getOrdersDocSchema } from "@/adapters/controllers/order/schema/GetOrdersSchema";
import { updateOrderStatusDocSchema } from "@/adapters/controllers/order/schema/UpdateOrderStatusSchema";
import { CreateOrderPresenter } from "@/adapters/presenters/order/CreateOrderPresenter";
import { GetOrderByIdPresenter } from "@/adapters/presenters/order/GetOrderByIdPresenter";
import { GetOrdersPresenter } from "@/adapters/presenters/order/GetOrdersPresenter";
import { GetOrdersQueueFormatedPresenter } from "@/adapters/presenters/order/GetOrdersQueueFormatedPresenter";
import { UpdateOrderStatusPresenter } from "@/adapters/presenters/order/UpdateOrderStatusPresenter";
import {
  makeOrderRepository,
  makeClientRepository,
  makeProductRepository,
  makeComboRepository,
} from "@/adapters/repositories/PrismaRepositoryFactory";
import { MercadoPagoService } from "@/adapters/services/mercadoPago/MercadoPagoService";
import { ComboUseCase } from "@/core/useCases/combo/ComboUseCase";
import { OrderUseCase } from "@/core/useCases/order/OrderUseCase";

export async function OrderRoutes(app: FastifyInstance) {
  const orderController = new OrderController(
    new OrderUseCase(
      makeOrderRepository(),
      makeClientRepository(),
      makeProductRepository(),
      makeComboRepository(),
      new MercadoPagoService(),
      new ComboUseCase(makeComboRepository(), makeProductRepository())
    ),

    new GetOrdersPresenter(),
    new GetOrdersQueueFormatedPresenter(),
    new CreateOrderPresenter(),
    new GetOrderByIdPresenter(),
    new UpdateOrderStatusPresenter()
  );

  app.get("", {
    schema: getOrdersDocSchema,
    handler: orderController.getOrders.bind(orderController),
  });

  app.get("/queue", {
    schema: getOrdersQueueFormatedDocSchema,
    handler: orderController.getOrdersQueueFormated.bind(orderController),
  });

  app.get("/:id", {
    schema: getOrderByIdDocSchema,
    handler: orderController.getOrderById.bind(orderController),
  });

  app.post("", {
    schema: createOrderDocSchema,
    handler: orderController.createOrder.bind(orderController),
  });

  app.patch("/:id", {
    schema: updateOrderStatusDocSchema,
    handler: orderController.updateOrderStatus.bind(orderController),
  });
}
