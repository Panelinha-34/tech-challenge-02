import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Product } from "@/core/domain/entities/Product";

export interface GetProductsUseCaseRequestDTO {
  params: PaginationParams;
  includeInactive: boolean;
  category?: string;
}

export interface GetProductsUseCaseResponseDTO {
  paginationResponse: PaginationResponse<Product>;
}
