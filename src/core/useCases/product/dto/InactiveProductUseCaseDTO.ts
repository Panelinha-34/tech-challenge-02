import { Product } from "@/core/domain/entities/Product";

export interface InactiveProductUseCaseRequestDTO {
  id: string;
}

export interface InactiveProductUseCaseResponseDTO {
  product: Product;
}
