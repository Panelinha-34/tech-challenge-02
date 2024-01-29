import { FastifyReply, FastifyRequest } from "fastify";

import { getCombosQueryParamsSchema } from "@/adapters/controllers/combo/schemas/GetCombosSchema";
import { GetCombosViewModel } from "@/adapters/controllers/combo/viewModels/GetCombosViewModel";
import { PaginationParams } from "@/core/domain/base/PaginationParams";
import {
  GetCombosUseCaseRequestDTO,
  GetCombosUseCaseResponseDTO,
} from "@/core/useCases/combo/dto/GetCombosUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class GetCombosPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      GetCombosUseCaseRequestDTO,
      GetCombosUseCaseResponseDTO,
      GetCombosViewModel
    >
{
  convertToUseCaseDTO(req: FastifyRequest): GetCombosUseCaseRequestDTO {
    const { page, pageSize } = getCombosQueryParamsSchema.parse(req.query);

    const params = new PaginationParams(page, pageSize);

    return {
      params,
    };
  }

  convertToViewModel(model: GetCombosUseCaseResponseDTO): GetCombosViewModel {
    return model.paginationResponse.toResponse((combo) => ({
      id: combo.id.toString(),
      name: combo.name,
      description: combo.description,
      price: combo.price,
      createdAt: combo.createdAt.toISOString(),
      updatedAt: combo.updatedAt?.toISOString(),
    }));
  }

  sendResponse(res: FastifyReply, response: GetCombosUseCaseResponseDTO) {
    return res.status(200).send(this.convertToViewModel(response));
  }
}
