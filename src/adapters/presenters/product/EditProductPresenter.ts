import { FastifyReply, FastifyRequest } from "fastify";

import {
  editProductPathParametersSchema,
  editProductPayloadSchema,
} from "@/adapters/controllers/product/schema/EditProductSchema";
import { EditProductViewModel } from "@/adapters/controllers/product/viewModel/EditProductViewModel";
import {
  EditProductUseCaseRequestDTO,
  EditProductUseCaseResponseDTO,
} from "@/core/useCases/product/dto/EditProductUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class EditProductPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      EditProductUseCaseRequestDTO,
      EditProductUseCaseResponseDTO,
      EditProductViewModel
    >
{
  convertToUseCaseDTO(req: FastifyRequest): EditProductUseCaseRequestDTO {
    const { id } = editProductPathParametersSchema.parse(req.params);
    const { name, category, description, price } =
      editProductPayloadSchema.parse(req.body);

    return {
      id,
      name,
      category,
      description,
      price,
    };
  }

  convertToViewModel(
    model: EditProductUseCaseResponseDTO
  ): EditProductViewModel {
    return {
      id: model.product.id.toString(),
      name: model.product.name,
      description: model.product.description,
      price: model.product.price,
      category: model.product.category.name,
      createdAt: model.product.createdAt.toISOString(),
      updatedAt: model.product.updatedAt?.toISOString(),
    };
  }

  sendResponse(
    res: FastifyReply,
    useCaseResponseModel: EditProductUseCaseResponseDTO
  ) {
    return res.status(200).send(this.convertToViewModel(useCaseResponseModel));
  }
}
