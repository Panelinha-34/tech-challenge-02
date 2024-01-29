import { FastifyInstance } from "fastify";

import { OrderNotificationController } from "@/adapters/controllers/orderNotification/OrderNotificationsController";
import { getOrderNotificationsDocSchema } from "@/adapters/controllers/orderNotification/schema/GetOrderNotificationsSchema";
import { GetOrderNotificationsPresenter } from "@/adapters/presenters/orderNotification/GetOrderNotificationsPresenter";
import { makeOrderNotificationRepository } from "@/adapters/repositories/PrismaRepositoryFactory";
import { OrderNotificationUseCase } from "@/core/useCases/orderNotification/OrderNotificationUseCase";

export async function OrderNotificationRoutes(app: FastifyInstance) {
  const orderNotificationController = new OrderNotificationController(
    new OrderNotificationUseCase(makeOrderNotificationRepository()),

    new GetOrderNotificationsPresenter()
  );

  app.get("", {
    schema: getOrderNotificationsDocSchema,
    handler: orderNotificationController.getOrderNotifications.bind(
      orderNotificationController
    ),
  });
}
