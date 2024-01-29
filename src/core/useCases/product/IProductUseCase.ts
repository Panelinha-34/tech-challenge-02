import {
  CreateProductUseCaseRequestDTO,
  CreateProductUseCaseResponseDTO,
} from "./dto/CreateProductUseCaseDTO";
import {
  EditProductUseCaseRequestDTO,
  EditProductUseCaseResponseDTO,
} from "./dto/EditProductUseCaseDTO";
import {
  GetProductByIdUseCaseRequestDTO,
  GetProductByIdUseCaseResponseDTO,
} from "./dto/GetProductByIdUseCaseDTO";
import {
  GetProductsUseCaseRequestDTO,
  GetProductsUseCaseResponseDTO,
} from "./dto/GetProductsUseCaseDTO";
import {
  InactiveProductUseCaseRequestDTO,
  InactiveProductUseCaseResponseDTO,
} from "./dto/InactiveProductUseCaseDTO";

export interface IProductUseCase {
  getProducts(
    props: GetProductsUseCaseRequestDTO
  ): Promise<GetProductsUseCaseResponseDTO>;

  getProductById(
    props: GetProductByIdUseCaseRequestDTO
  ): Promise<GetProductByIdUseCaseResponseDTO>;

  createProduct(
    props: CreateProductUseCaseRequestDTO
  ): Promise<CreateProductUseCaseResponseDTO>;

  editProduct(
    props: EditProductUseCaseRequestDTO
  ): Promise<EditProductUseCaseResponseDTO>;

  inactiveProduct(
    props: InactiveProductUseCaseRequestDTO
  ): Promise<InactiveProductUseCaseResponseDTO>;
}
