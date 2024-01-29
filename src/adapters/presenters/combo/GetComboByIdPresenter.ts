import { FastifyReply, FastifyRequest } from "fastify";

import { getComboByIdPathParamsSchema } from "@/adapters/controllers/combo/schemas/GetComboByIdSchema";
import { GetComboByIdViewModel } from "@/adapters/controllers/combo/viewModels/GetComboByIdViewModel";
import {
  GetComboByIdUseCaseRequestDTO,
  GetComboByIdUseCaseResponseDTO,
} from "@/core/useCases/combo/dto/GetComboByIdUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class GetComboByIdPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      GetComboByIdUseCaseRequestDTO,
      GetComboByIdUseCaseResponseDTO,
      GetComboByIdViewModel
    >
{
  convertToUseCaseDTO(req: FastifyRequest): GetComboByIdUseCaseRequestDTO {
    const { id } = getComboByIdPathParamsSchema.parse(req.params);

    return {
      id,
    };
  }

  convertToViewModel(
    model: GetComboByIdUseCaseResponseDTO
  ): GetComboByIdViewModel {
    return {
      id: model.combo.id.toString(),
      name: model.combo.name,
      description: model.combo.description,
      price: model.combo.price,
      createdAt: model.combo.createdAt.toISOString(),
      updatedAt: model.combo.updatedAt?.toISOString(),
      products: model.productDetails.map((product) => ({
        id: product.id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category.name,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt?.toISOString(),
      })),
    };
  }

  sendResponse(
    res: FastifyReply,
    useCaseResponseModel: GetComboByIdUseCaseResponseDTO
  ) {
    return res.status(200).send(this.convertToViewModel(useCaseResponseModel));
  }
}
