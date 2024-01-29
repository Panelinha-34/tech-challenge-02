import { UnsupportedArgumentValueError } from "@/core/domain/base/errors/entities/UnsupportedArgumentValueError";
import { AttributeConflictError } from "@/core/domain/base/errors/useCases/AttributeConflictError";
import { ResourceNotFoundError } from "@/core/domain/base/errors/useCases/ResourceNotFoundError";
import { Product } from "@/core/domain/entities/Product";
import { CategoriesEnum } from "@/core/domain/enums/CategoriesEnum";
import { Category } from "@/core/domain/valueObjects/Category";
import { IProductRepository } from "@/core/interfaces/repositories/IProductRepository";

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
import { IProductUseCase } from "./IProductUseCase";

export class ProductUseCase implements IProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async getProducts({
    params,
    includeInactive,
    category,
  }: GetProductsUseCaseRequestDTO): Promise<GetProductsUseCaseResponseDTO> {
    if (
      category &&
      !Object.keys(CategoriesEnum)
        .map((e) => e.toLowerCase())
        .includes(category.toLowerCase())
    ) {
      throw new UnsupportedArgumentValueError(Category.name);
    }

    const productCategory = category
      ? new Category({ name: category as CategoriesEnum })
      : undefined;

    const paginationResponse = await this.productRepository.findMany(
      params,
      includeInactive,
      productCategory
    );

    return { paginationResponse };
  }

  async getProductById({
    id,
  }: GetProductByIdUseCaseRequestDTO): Promise<GetProductByIdUseCaseResponseDTO> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new ResourceNotFoundError("product");
    }

    return { product };
  }

  async createProduct({
    category,
    description,
    name,
    price,
  }: CreateProductUseCaseRequestDTO): Promise<CreateProductUseCaseResponseDTO> {
    const hasProductWithSameName =
      await this.productRepository.findByName(name);

    if (hasProductWithSameName) {
      throw new AttributeConflictError<Product>("name", Product.name);
    }

    const product = await this.productRepository.create(
      new Product({
        name,
        price,
        category: new Category({ name: category as CategoriesEnum }),
        description,
      })
    );

    return { product };
  }

  async editProduct({
    id,
    name,
    category,
    description,
    price,
  }: EditProductUseCaseRequestDTO): Promise<EditProductUseCaseResponseDTO> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new ResourceNotFoundError("product");
    }

    if (name) {
      const hasProductWithSameName =
        await this.productRepository.findByName(name);

      if (
        hasProductWithSameName &&
        hasProductWithSameName.id.toString() !== product.id.toString()
      ) {
        throw new AttributeConflictError("name", "product");
      }

      product.name = name;
    }

    if (description) {
      product.description = description;
    }

    if (category) {
      product.category = new Category({ name: category as CategoriesEnum });
    }

    if (price) {
      product.price = price;
    }

    const updatedProduct = await this.productRepository.update(product);

    return { product: updatedProduct };
  }

  async inactiveProduct(
    props: InactiveProductUseCaseRequestDTO
  ): Promise<InactiveProductUseCaseResponseDTO> {
    const { id } = props;

    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new ResourceNotFoundError(Product.name);
    }

    product.active = false;

    const updatedProduct = await this.productRepository.update(product);

    return { product: updatedProduct };
  }
}
