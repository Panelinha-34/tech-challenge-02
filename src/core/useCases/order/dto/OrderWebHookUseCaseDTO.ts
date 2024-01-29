import { Order } from "@prisma/client";

export interface OrderWebHookUseCaseRequestDTO {
  platformOrderId: string;
}

export interface OrderWebHookUseCaseResponseDTO {
  order: Order;
}
