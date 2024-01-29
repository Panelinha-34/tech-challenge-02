import { FastifyReply, FastifyRequest } from "fastify";

import {
  editClientPathParametersSchema,
  editClientPayloadSchema,
} from "@/adapters/controllers/client/schemas/EditClientSchema";
import { EditClientViewModel } from "@/adapters/controllers/client/viewModels/EditClientViewModel";
import {
  EditClientUseCaseRequestDTO,
  EditClientUseCaseResponseDTO,
} from "@/core/useCases/client/dto/EditClientUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class EditClientPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      EditClientUseCaseRequestDTO,
      EditClientUseCaseResponseDTO,
      EditClientViewModel
    >
{
  convertToUseCaseDTO(req: FastifyRequest): EditClientUseCaseRequestDTO {
    const { id } = editClientPathParametersSchema.parse(req.params);
    const { email, name } = editClientPayloadSchema.parse(req.body);

    return {
      id,
      email,
      name,
    };
  }

  sendResponse(
    res: FastifyReply,
    useCaseResponseModel: EditClientUseCaseResponseDTO
  ) {
    return res.status(200).send(this.convertToViewModel(useCaseResponseModel));
  }

  convertToViewModel(model: EditClientUseCaseResponseDTO): EditClientViewModel {
    return {
      id: model.client.id.toString(),
      name: model.client.name,
      email: model.client.email,
      taxVat: model.client.taxVat.number,
      createdAt: model.client.createdAt.toISOString(),
      updatedAt: model.client.updatedAt?.toISOString(),
    };
  }
}
