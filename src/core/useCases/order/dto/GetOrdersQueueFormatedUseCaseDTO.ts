import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Order } from "@/core/domain/entities/Order";

export interface GetOrdersQueueFormatedUseCaseRequestDTO {
  params: PaginationParams;
}

export interface GetOrdersQueueFormatedUseCaseResponseDTO {
  paginationResponse: PaginationResponse<Order>;
}
