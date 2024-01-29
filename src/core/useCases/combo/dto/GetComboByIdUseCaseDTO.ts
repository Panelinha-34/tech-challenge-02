import { Combo } from "@/core/domain/entities/Combo";
import { Product } from "@/core/domain/entities/Product";

export interface GetComboByIdUseCaseRequestDTO {
  id: string;
}

export interface GetComboByIdUseCaseResponseDTO {
  combo: Combo;
  productDetails: Product[];
}
