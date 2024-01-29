import { Combo } from "@/core/domain/entities/Combo";
import { Product } from "@/core/domain/entities/Product";

export interface EditComboUseCaseRequestDTO {
  id: string;
  name?: string;
  description?: string;
  sandwichId?: string;
  drinkId?: string;
  sideId?: string;
  dessertId?: string;
}

export interface EditComboUseCaseResponseDTO {
  combo: Combo;
  productDetails: Product[];
}
