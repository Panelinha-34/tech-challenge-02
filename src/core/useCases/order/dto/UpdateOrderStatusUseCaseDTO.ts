import { Order } from "@/core/domain/entities/Order";

export interface UpdateOrderStatusUseCaseRequestDTO {
  id: string;
  status: string;
}

export interface UpdateOrderStatusUseCaseResponseDTO {
  order: Order;
}
