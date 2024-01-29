import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Combo } from "@/core/domain/entities/Combo";

export interface GetCombosUseCaseRequestDTO {
  params: PaginationParams;
}

export interface GetCombosUseCaseResponseDTO {
  paginationResponse: PaginationResponse<Combo>;
}
