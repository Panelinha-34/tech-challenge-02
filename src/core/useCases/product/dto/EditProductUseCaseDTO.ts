import { Product } from "@/core/domain/entities/Product";

export interface EditProductUseCaseRequestDTO {
  id: string;
  name?: string;
  price?: number;
  description?: string;
  category?: string;
}

export interface EditProductUseCaseResponseDTO {
  product: Product;
}
