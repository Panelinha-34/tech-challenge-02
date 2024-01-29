import { DomainEvents } from "@/core/domain/base/events/DomainEvents";
import { EventHandler } from "@/core/domain/base/events/EventHandler";
import { UpdatedOrderStatusEvent } from "@/core/domain/events/UpdatedOrderStatusEvent";

import { OrderStatusEnum } from "../domain/enums/OrderStatusEnum";
import { IOrderNotificationUseCase } from "../useCases/orderNotification/IOrderNotificationUseCase";

export class UpdatedOrderStatusSubscriber implements EventHandler {
  constructor(private orderNotificationUseCase: IOrderNotificationUseCase) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewOrderNotification.bind(this),
      UpdatedOrderStatusEvent.name
    );
  }

  private async sendNewOrderNotification({ order }: UpdatedOrderStatusEvent) {
    if (!order.clientId) return;

    const statusMessages: Partial<Record<OrderStatusEnum, string>> = {
      [OrderStatusEnum.PENDING_PAYMENT]:
        "Your order has been created! Soon you will receive a notification with the status of your order.",
      [OrderStatusEnum.RECEIVED]:
        "We received your payment! We will start preparing your order soon.",
      [OrderStatusEnum.IN_PREPARATION]: "Your order is being prepared!",
      [OrderStatusEnum.READY]: "Your order is ready! Go get it!",
      [OrderStatusEnum.COMPLETED]: "Thanks for your purchase! See you soon!",
      [OrderStatusEnum.CANCELLED]: "Your order has been cancelled.",
    };

    const message = statusMessages[order.status.name];

    if (message) {
      await this.orderNotificationUseCase.createOrderNotification({
        clientId: order.clientId.toString(),
        orderId: order.id.toString(),
        message,
      });
    }
  }
}
