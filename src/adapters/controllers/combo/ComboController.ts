import { FastifyReply, FastifyRequest } from "fastify";

import { GetComboByIdPresenter } from "@/adapters/presenters/combo/GetComboByIdPresenter";
import { GetCombosPresenter } from "@/adapters/presenters/combo/GetCombosPresenter";
import { IComboUseCase } from "@/core/useCases/combo/IComboUseCase";

import { GetComboByIdViewModel } from "./viewModels/GetComboByIdViewModel";
import { GetCombosViewModel } from "./viewModels/GetCombosViewModel";

export class ComboController {
  constructor(
    private comboUseCase: IComboUseCase,

    private getCombosPresenter: GetCombosPresenter,
    private getComboByIdPresenter: GetComboByIdPresenter
  ) {}

  async getCombos(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetCombosViewModel> {
    return this.comboUseCase
      .getCombos(this.getCombosPresenter.convertToUseCaseDTO(req))
      .then((response) => this.getCombosPresenter.sendResponse(res, response))
      .catch((error) =>
        this.getCombosPresenter.convertErrorResponse(error, res)
      );
  }

  async getComboById(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetComboByIdViewModel> {
    return this.comboUseCase
      .getComboById(this.getComboByIdPresenter.convertToUseCaseDTO(req))
      .then((response) =>
        this.getComboByIdPresenter.sendResponse(res, response)
      )
      .catch((error) =>
        this.getComboByIdPresenter.convertErrorResponse(error, res)
      );
  }
}
