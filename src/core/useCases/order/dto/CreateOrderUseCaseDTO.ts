import { Order } from "@/core/domain/entities/Order";

export interface CreateOrderUseCaseRequestDTO {
  clientId?: string;
  visitorName?: string;
  paymentMethod: string;
  paymentDetails?: string;
  combos: {
    sandwichId?: string;
    sideId?: string;
    drinkId?: string;
    dessertId?: string;
    quantity: number;
    annotation?: string;
  }[];
}

export interface CreateOrderUseCaseResponseDTO {
  order: Order;
}
