import { FastifyReply, FastifyRequest } from "fastify";

import { checkClientByTaxvatQueryParamsSchema } from "@/adapters/controllers/client/schemas/CheckClientByTaxvatSchema";
import { CheckClientByTaxvatViewModel } from "@/adapters/controllers/client/viewModels/CheckClientByTaxvatViewModel";
import {
  CheckClientByTaxvatUseCaseRequestDTO,
  CheckClientByTaxvatUseCaseResponseDTO,
} from "@/core/useCases/client/dto/CheckClientByTaxvatUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class CheckClientByTaxvatPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      CheckClientByTaxvatUseCaseRequestDTO,
      CheckClientByTaxvatUseCaseResponseDTO,
      CheckClientByTaxvatViewModel
    >
{
  convertToUseCaseDTO(
    req: FastifyRequest
  ): CheckClientByTaxvatUseCaseRequestDTO {
    const { taxvat } = checkClientByTaxvatQueryParamsSchema.parse(req.query);

    return {
      taxvat,
    };
  }

  convertToViewModel({
    exist,
  }: CheckClientByTaxvatUseCaseResponseDTO): CheckClientByTaxvatViewModel {
    return {
      exist,
    };
  }

  sendResponse(
    res: FastifyReply,
    useCaseResponseModel: CheckClientByTaxvatUseCaseResponseDTO
  ) {
    return res.status(200).send(this.convertToViewModel(useCaseResponseModel));
  }
}
