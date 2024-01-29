import { Product } from "@/core/domain/entities/Product";

export interface CreateProductUseCaseRequestDTO {
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface CreateProductUseCaseResponseDTO {
  product: Product;
}
