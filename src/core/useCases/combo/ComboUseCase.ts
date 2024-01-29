/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

import { EntityNotActiveError } from "@/core/domain/base/errors/useCases/EntityNotActiveError";
import { MinimumResourcesNotReached } from "@/core/domain/base/errors/useCases/MinimumResourcesNotReached";
import { ResourceNotFoundError } from "@/core/domain/base/errors/useCases/ResourceNotFoundError";
import { Combo } from "@/core/domain/entities/Combo";
import { ComboProduct } from "@/core/domain/entities/ComboProduct";
import { Product } from "@/core/domain/entities/Product";
import { CategoriesEnum } from "@/core/domain/enums/CategoriesEnum";
import { Category } from "@/core/domain/valueObjects/Category";
import { IComboRepository } from "@/core/interfaces/repositories/IComboRepository";
import { IProductRepository } from "@/core/interfaces/repositories/IProductRepository";

import {
  CreateComboUseCaseRequestDTO,
  CreateComboUseCaseResponseDTO,
} from "./dto/CreateComboUseCaseDTO";
import { DeleteComboUseCaseRequestDTO } from "./dto/DeleteComboUseCaseDTO";
import {
  EditComboUseCaseRequestDTO,
  EditComboUseCaseResponseDTO,
} from "./dto/EditComboUseCaseDTO";
import {
  GetComboByIdUseCaseRequestDTO,
  GetComboByIdUseCaseResponseDTO,
} from "./dto/GetComboByIdUseCaseDTO";
import {
  GetCombosUseCaseRequestDTO,
  GetCombosUseCaseResponseDTO,
} from "./dto/GetCombosUseCaseDTO";
import { IComboUseCase } from "./IComboUseCase";

export class ComboUseCase implements IComboUseCase {
  constructor(
    private comboRepository: IComboRepository,
    private productRepository: IProductRepository
  ) {}

  async getCombos({
    params,
  }: GetCombosUseCaseRequestDTO): Promise<GetCombosUseCaseResponseDTO> {
    const paginationResponse = await this.comboRepository.findMany(params);

    return { paginationResponse };
  }

  async getComboById({
    id,
  }: GetComboByIdUseCaseRequestDTO): Promise<GetComboByIdUseCaseResponseDTO> {
    const combo = await this.comboRepository.findById(id);

    if (!combo) {
      throw new ResourceNotFoundError("combo");
    }

    const productIds = combo.products
      .getItems()
      .map((p) => p.productId.toString());

    const productDetails =
      await this.productRepository.findManyByIds(productIds);

    return { combo, productDetails };
  }

  async createCombo({
    description,
    name,
    sandwichId,
    drinkId,
    sideId,
    dessertId,
  }: CreateComboUseCaseRequestDTO): Promise<CreateComboUseCaseResponseDTO> {
    const productIds = [sandwichId, drinkId, sideId, dessertId].filter(
      (p): p is string => !!p
    );

    const hasMinProducts = productIds.length >= 1;

    if (!hasMinProducts) {
      throw new MinimumResourcesNotReached(Combo.name);
    }

    const productMap: Record<string, CategoriesEnum> = {};

    if (sandwichId) productMap[sandwichId] = CategoriesEnum.SANDWICH;
    if (drinkId) productMap[drinkId] = CategoriesEnum.DRINK;
    if (sideId) productMap[sideId] = CategoriesEnum.SIDE_DISH;
    if (dessertId) productMap[dessertId] = CategoriesEnum.DESSERT;

    for (const id of productIds) {
      const productCategory = new Category({ name: productMap[id] });
      const product = await this.productRepository.findByIdAndCategory(
        id,
        productCategory
      );

      if (!product) {
        throw new ResourceNotFoundError(productMap[id].toLowerCase(), []);
      }

      if (!product.active) {
        throw new EntityNotActiveError(Product.name, [id]);
      }
    }

    const productDetails =
      await this.productRepository.findManyByIds(productIds);

    const comboPrice = productDetails.reduce(
      (total, product) => total + product.price,
      0
    );

    const combo = new Combo({
      price: comboPrice,
      name,
      description,
    });

    productDetails
      .map((p) => p.id)
      .map(
        (id) =>
          new ComboProduct({
            comboId: combo.id,
            productId: id,
          })
      )
      .forEach((c) => combo.products.add(c));

    await this.comboRepository.create(combo);

    return { combo, productDetails };
  }

  async editCombo({
    id,
    description,
    name,
    sandwichId,
    drinkId,
    sideId,
    dessertId,
  }: EditComboUseCaseRequestDTO): Promise<EditComboUseCaseResponseDTO> {
    const combo = await this.comboRepository.findById(id);

    if (!combo) {
      throw new ResourceNotFoundError("combo");
    }

    const productIds = [sandwichId, drinkId, sideId, dessertId].filter(
      (p): p is string => !!p
    );

    const hasMinProducts = productIds.length >= 1;

    if (!hasMinProducts) {
      throw new MinimumResourcesNotReached(Combo.name);
    }

    const productMap: Record<string, CategoriesEnum> = {};

    if (sandwichId) productMap[sandwichId] = CategoriesEnum.SANDWICH;
    if (drinkId) productMap[drinkId] = CategoriesEnum.DRINK;
    if (sideId) productMap[sideId] = CategoriesEnum.SIDE_DISH;
    if (dessertId) productMap[dessertId] = CategoriesEnum.DESSERT;

    for (const productId of productIds) {
      const productCategory = new Category({ name: productMap[productId] });
      const product = await this.productRepository.findByIdAndCategory(
        productId,
        productCategory
      );

      if (!product) {
        throw new ResourceNotFoundError(productMap[productId].toLowerCase(), [
          productId,
        ]);
      }

      if (!product.active) {
        throw new EntityNotActiveError(Product.name, [productId]);
      }
    }

    const productDetails =
      await this.productRepository.findManyByIds(productIds);

    const comboPrice = productDetails.reduce(
      (total, product) => total + product.price,
      0
    );

    combo.price = comboPrice;

    if (name) combo.name = name;
    if (description) combo.description = description;

    const comboProducts = productDetails
      .map((p) => p.id)
      .map(
        (pId) =>
          new ComboProduct({
            comboId: combo.id,
            productId: pId,
          })
      );

    combo.products.update(comboProducts);

    await this.comboRepository.update(combo);

    return { combo, productDetails };
  }

  async deleteCombo(props: DeleteComboUseCaseRequestDTO) {
    const combo = await this.comboRepository.findById(props.id);

    if (!combo) {
      throw new ResourceNotFoundError(Combo.name);
    }

    await this.comboRepository.delete(combo.id.toString());
  }
}
