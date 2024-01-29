import { FastifyReply, FastifyRequest } from "fastify";

import { getClientByIdQueryParamsSchema } from "@/adapters/controllers/client/schemas/GetClientByIdSchema";
import { GetClientByIdViewModel } from "@/adapters/controllers/client/viewModels/GetClientByIdViewModel";
import {
  GetClientByIdUseCaseRequestDTO,
  GetClientByIdUseCaseResponseDTO,
} from "@/core/useCases/client/dto/GetClientByIdUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class GetClientByIdPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      GetClientByIdUseCaseRequestDTO,
      GetClientByIdUseCaseResponseDTO,
      GetClientByIdViewModel
    >
{
  convertToUseCaseDTO(req: FastifyRequest): GetClientByIdUseCaseRequestDTO {
    const { id } = getClientByIdQueryParamsSchema.parse(req.params);

    return {
      id,
    };
  }

  convertToViewModel(
    model: GetClientByIdUseCaseResponseDTO
  ): GetClientByIdViewModel {
    const client = {
      id: model.client.id.toString(),
      name: model.client.name,
      email: model.client.email,
      taxVat: model.client.taxVat.number,
      createdAt: model.client.createdAt.toISOString(),
      updatedAt: model.client.updatedAt?.toISOString(),
    };

    return client;
  }

  sendResponse(
    res: FastifyReply,
    useCaseResponseModel: GetClientByIdUseCaseResponseDTO
  ) {
    const client = this.convertToViewModel(useCaseResponseModel);

    return res.status(200).send(client);
  }
}
