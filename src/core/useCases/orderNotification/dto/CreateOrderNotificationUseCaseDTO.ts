import { OrderNotification } from "@/core/domain/entities/OrderNotification";

export interface CreateOrderNotificationUseCaseRequestDTO {
  clientId: string;
  orderId: string;
  message: string;
}

export interface CreateOrderNotificationUseCaseResponseDTO {
  orderNotification: OrderNotification;
}
