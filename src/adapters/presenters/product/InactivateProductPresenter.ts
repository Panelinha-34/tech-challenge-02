import { FastifyReply, FastifyRequest } from "fastify";

import { inactiveProductPathParametersSchema } from "@/adapters/controllers/product/schema/InactiveProducSchema";
import { InactiveProductViewModel } from "@/adapters/controllers/product/viewModel/InactiveProductViewModel";
import {
  InactiveProductUseCaseRequestDTO,
  InactiveProductUseCaseResponseDTO,
} from "@/core/useCases/product/dto/InactiveProductUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class InactivateProductPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      InactiveProductUseCaseRequestDTO,
      InactiveProductUseCaseResponseDTO,
      InactiveProductViewModel
    >
{
  convertToUseCaseDTO(req: FastifyRequest): InactiveProductUseCaseRequestDTO {
    const { id } = inactiveProductPathParametersSchema.parse(req.params);

    return {
      id,
    };
  }

  convertToViewModel(
    model: InactiveProductUseCaseResponseDTO
  ): InactiveProductViewModel {
    return {
      id: model.product.id.toString(),
      name: model.product.name,
      active: model.product.active,
      description: model.product.description,
      price: model.product.price,
      category: model.product.category.name,
      createdAt: model.product.createdAt.toISOString(),
      updatedAt: model.product.updatedAt?.toISOString(),
    };
  }

  sendResponse(
    res: FastifyReply,
    useCaseResponseModel: InactiveProductUseCaseResponseDTO
  ) {
    return res.status(200).send(this.convertToViewModel(useCaseResponseModel));
  }
}
