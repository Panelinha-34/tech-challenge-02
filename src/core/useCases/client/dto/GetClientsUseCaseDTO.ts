import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Client } from "@/core/domain/entities/Client";

export interface GetClientsUseCaseRequestDTO {
  params: PaginationParams;
}

export interface GetClientsUseCaseResponseDTO {
  paginationResponse: PaginationResponse<Client>;
}
