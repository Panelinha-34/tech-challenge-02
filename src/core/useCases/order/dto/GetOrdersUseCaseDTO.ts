import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Order } from "@/core/domain/entities/Order";

export interface GetOrdersUseCaseRequestDTO {
  params: PaginationParams;
  status?: string;
  clientId?: string;
}

export interface GetOrdersUseCaseResponseDTO {
  paginationResponse: PaginationResponse<Order>;
}
