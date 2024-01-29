import { FastifyReply, FastifyRequest } from "fastify";

import { getProductsQueryParamsSchema } from "@/adapters/controllers/product/schema/GetProductsSchema";
import { GetProductsViewModel } from "@/adapters/controllers/product/viewModel/GetProductsViewModel";
import { PaginationParams } from "@/core/domain/base/PaginationParams";
import {
  GetProductsUseCaseRequestDTO,
  GetProductsUseCaseResponseDTO,
} from "@/core/useCases/product/dto/GetProductsUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class GetProductsPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      GetProductsUseCaseRequestDTO,
      GetProductsUseCaseResponseDTO,
      GetProductsViewModel
    >
{
  convertToUseCaseDTO(req: FastifyRequest): GetProductsUseCaseRequestDTO {
    const { page, pageSize, category, includeInactive } =
      getProductsQueryParamsSchema.parse(req.query);

    const params = new PaginationParams(page, pageSize);

    return {
      params,
      includeInactive,
      category,
    };
  }

  convertToViewModel(
    model: GetProductsUseCaseResponseDTO
  ): GetProductsViewModel {
    return model.paginationResponse.toResponse((product) => ({
      id: product.id.toString(),
      name: product.name,
      active: product.active,
      description: product.description,
      price: product.price,
      category: product.category.name,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt?.toISOString(),
    }));
  }

  sendResponse(res: FastifyReply, response: GetProductsUseCaseResponseDTO) {
    return res.status(200).send(this.convertToViewModel(response));
  }
}
