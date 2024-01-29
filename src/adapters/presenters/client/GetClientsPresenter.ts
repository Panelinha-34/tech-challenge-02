import { FastifyReply, FastifyRequest } from "fastify";

import { getClientsQueryParamsSchema } from "@/adapters/controllers/client/schemas/GetClientsSchema";
import { GetClientsViewModel } from "@/adapters/controllers/client/viewModels/GetClientsViewModel";
import { PaginationParams } from "@/core/domain/base/PaginationParams";
import {
  GetClientsUseCaseRequestDTO,
  GetClientsUseCaseResponseDTO,
} from "@/core/useCases/client/dto/GetClientsUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class GetClientsPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      GetClientsUseCaseRequestDTO,
      GetClientsUseCaseResponseDTO,
      GetClientsViewModel
    >
{
  convertToUseCaseDTO(req: FastifyRequest): GetClientsUseCaseRequestDTO {
    const { page, pageSize } = getClientsQueryParamsSchema.parse(req.query);

    const params = new PaginationParams(page, pageSize);

    return {
      params,
    };
  }

  convertToViewModel(model: GetClientsUseCaseResponseDTO): GetClientsViewModel {
    const clients = model.paginationResponse.toResponse((item) => ({
      id: item.id.toString(),
      name: item.name,
      email: item.email,
      taxVat: item.taxVat.number,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt?.toISOString(),
    }));

    return clients;
  }

  sendResponse(res: FastifyReply, response: GetClientsUseCaseResponseDTO) {
    const clients = this.convertToViewModel(response);

    return res.status(200).send(clients);
  }
}
