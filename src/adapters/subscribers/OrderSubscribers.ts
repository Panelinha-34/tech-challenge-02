/* eslint-disable no-new */

import { UpdatedOrderStatusSubscriber } from "@/core/subscribers/UpdatedOrderStatusSubscriber";
import { OrderNotificationUseCase } from "@/core/useCases/orderNotification/OrderNotificationUseCase";

import { PrismaOrderNotificationsPrismaRepository } from "../repositories/PrismaOrderNotificationsRepository";

export function orderSubscribers() {
  const orderNotificationRepository =
    new PrismaOrderNotificationsPrismaRepository();

  const orderNotificationUseCase = new OrderNotificationUseCase(
    orderNotificationRepository
  );

  new UpdatedOrderStatusSubscriber(orderNotificationUseCase);
}
