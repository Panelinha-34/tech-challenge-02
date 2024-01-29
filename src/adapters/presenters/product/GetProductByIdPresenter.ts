import { FastifyReply, FastifyRequest } from "fastify";

import { getProductByIdQueryParamsSchema } from "@/adapters/controllers/product/schema/GetProductByIdSchema";
import { GetProductByIdViewModel } from "@/adapters/controllers/product/viewModel/GetProductByIdViewModel";
import {
  GetProductByIdUseCaseRequestDTO,
  GetProductByIdUseCaseResponseDTO,
} from "@/core/useCases/product/dto/GetProductByIdUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class GetProductByIdPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      GetProductByIdUseCaseRequestDTO,
      GetProductByIdUseCaseResponseDTO,
      GetProductByIdViewModel
    >
{
  convertToUseCaseDTO(req: FastifyRequest): GetProductByIdUseCaseRequestDTO {
    const { id } = getProductByIdQueryParamsSchema.parse(req.params);

    return {
      id,
    };
  }

  convertToViewModel(
    model: GetProductByIdUseCaseResponseDTO
  ): GetProductByIdViewModel {
    return {
      id: model.product.id.toString(),
      name: model.product.name,
      price: model.product.price,
      active: model.product.active,
      description: model.product.description,
      category: model.product.category.name,
      createdAt: model.product.createdAt.toISOString(),
      updatedAt: model.product.updatedAt?.toISOString(),
    };
  }

  sendResponse(
    res: FastifyReply,
    useCaseResponseModel: GetProductByIdUseCaseResponseDTO
  ) {
    return res.status(200).send(this.convertToViewModel(useCaseResponseModel));
  }
}
