import { Combo } from "@/core/domain/entities/Combo";
import { Order } from "@/core/domain/entities/Order";
import { OrderComboItem } from "@/core/domain/entities/OrderComboItem";

export interface GetOrderByIdUseCaseRequestDTO {
  id: string;
}

export interface GetOrderByIdUseCaseResponseDTO {
  order: Order;
  orderCombos: OrderComboItem[];
  combos: Combo[];
}
