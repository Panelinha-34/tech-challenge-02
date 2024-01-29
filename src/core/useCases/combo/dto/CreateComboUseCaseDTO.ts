import { Combo } from "@/core/domain/entities/Combo";
import { Product } from "@/core/domain/entities/Product";

export interface CreateComboUseCaseRequestDTO {
  name?: string;
  description?: string;
  sandwichId?: string;
  drinkId?: string;
  sideId?: string;
  dessertId?: string;
}

export interface CreateComboUseCaseResponseDTO {
  combo: Combo;
  productDetails: Product[];
}
