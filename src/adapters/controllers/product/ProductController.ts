import { FastifyReply, FastifyRequest } from "fastify";

import { CreateProductPresenter } from "@/adapters/presenters/product/CreateProductPresenter";
import { EditProductPresenter } from "@/adapters/presenters/product/EditProductPresenter";
import { GetProductByIdPresenter } from "@/adapters/presenters/product/GetProductByIdPresenter";
import { GetProductsPresenter } from "@/adapters/presenters/product/GetProductsPresenter";
import { InactivateProductPresenter } from "@/adapters/presenters/product/InactivateProductPresenter";
import { IProductUseCase } from "@/core/useCases/product/IProductUseCase";

import { GetProductByIdViewModel } from "./viewModel/GetProductByIdViewModel";
import { GetProductsViewModel } from "./viewModel/GetProductsViewModel";
import { InactiveProductViewModel } from "./viewModel/InactiveProductViewModel";

export class ProductController {
  constructor(
    private productUseCase: IProductUseCase,

    private getProductsPresenter: GetProductsPresenter,
    private getProductByIdPresenter: GetProductByIdPresenter,
    private createProductPresenter: CreateProductPresenter,
    private editProductPresenter: EditProductPresenter,
    private inactivateProductPresenter: InactivateProductPresenter
  ) {}

  async getProducts(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetProductsViewModel> {
    return this.productUseCase
      .getProducts(this.getProductsPresenter.convertToUseCaseDTO(req))
      .then((response) => this.getProductsPresenter.sendResponse(res, response))
      .catch((error) =>
        this.getProductsPresenter.convertErrorResponse(error, res)
      );
  }

  async getProductById(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetProductByIdViewModel> {
    return this.productUseCase
      .getProductById(this.getProductByIdPresenter.convertToUseCaseDTO(req))
      .then((response) =>
        this.getProductByIdPresenter.sendResponse(res, response)
      )
      .catch((error) =>
        this.getProductByIdPresenter.convertErrorResponse(error, res)
      );
  }

  async createProduct(req: FastifyRequest, res: FastifyReply): Promise<void> {
    return this.productUseCase
      .createProduct(this.createProductPresenter.convertToUseCaseDTO(req))
      .then((response) =>
        this.createProductPresenter.sendResponse(res, response)
      )
      .catch((error) =>
        this.createProductPresenter.convertErrorResponse(error, res)
      );
  }

  async editProduct(req: FastifyRequest, res: FastifyReply): Promise<void> {
    return this.productUseCase
      .editProduct(this.editProductPresenter.convertToUseCaseDTO(req))
      .then((response) => this.editProductPresenter.sendResponse(res, response))
      .catch((error) =>
        this.editProductPresenter.convertErrorResponse(error, res)
      );
  }

  async inactivateProduct(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<InactiveProductViewModel> {
    return this.productUseCase
      .inactiveProduct(this.inactivateProductPresenter.convertToUseCaseDTO(req))
      .then((response) =>
        this.inactivateProductPresenter.sendResponse(res, response)
      )
      .catch((error) =>
        this.inactivateProductPresenter.convertErrorResponse(error, res)
      );
  }
}
