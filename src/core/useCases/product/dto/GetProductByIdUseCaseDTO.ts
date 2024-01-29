import { Product } from "@/core/domain/entities/Product";

export interface GetProductByIdUseCaseRequestDTO {
  id: string;
}

export interface GetProductByIdUseCaseResponseDTO {
  product: Product;
}
