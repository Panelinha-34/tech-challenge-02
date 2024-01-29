import { FastifyReply, FastifyRequest } from "fastify";

import { CheckClientByTaxvatPresenter } from "@/adapters/presenters/client/CheckClientByTaxvatPresenter";
import { CreateClientPresenter } from "@/adapters/presenters/client/CreateClientPresenter";
import { EditClientPresenter } from "@/adapters/presenters/client/EditClientPresenter";
import { GetClientByIdPresenter } from "@/adapters/presenters/client/GetClientByIdPresenter";
import { GetClientsPresenter } from "@/adapters/presenters/client/GetClientsPresenter";
import { IClientUseCase } from "@/core/useCases/client/IClientUseCase";

import { CheckClientByTaxvatViewModel } from "./viewModels/CheckClientByTaxvatViewModel";
import { EditClientViewModel } from "./viewModels/EditClientViewModel";
import { GetClientByIdViewModel } from "./viewModels/GetClientByIdViewModel";
import { GetClientsViewModel } from "./viewModels/GetClientsViewModel";

export class ClientController {
  constructor(
    private clientUseCase: IClientUseCase,

    private getClientsPresenter: GetClientsPresenter,
    private getClientByIdPresenter: GetClientByIdPresenter,
    private createClientPresenter: CreateClientPresenter,
    private editClientPresenter: EditClientPresenter,
    private checkClientByTaxvatPresenter: CheckClientByTaxvatPresenter
  ) {}

  async getClients(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetClientsViewModel> {
    return this.clientUseCase
      .getClients(this.getClientsPresenter.convertToUseCaseDTO(req))
      .then((response) => this.getClientsPresenter.sendResponse(res, response))
      .catch((error) =>
        this.getClientsPresenter.convertErrorResponse(error, res)
      );
  }

  async checkClientByTaxvat(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<CheckClientByTaxvatViewModel> {
    return this.clientUseCase
      .checkByTaxvat(this.checkClientByTaxvatPresenter.convertToUseCaseDTO(req))
      .then((response) =>
        this.checkClientByTaxvatPresenter.sendResponse(res, response)
      )
      .catch((error) =>
        this.checkClientByTaxvatPresenter.convertErrorResponse(error, res)
      );
  }

  async getClientById(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetClientByIdViewModel> {
    return this.clientUseCase
      .getClientById(this.getClientByIdPresenter.convertToUseCaseDTO(req))
      .then((response) =>
        this.getClientByIdPresenter.sendResponse(res, response)
      )
      .catch((error) =>
        this.getClientByIdPresenter.convertErrorResponse(error, res)
      );
  }

  async createClient(req: FastifyRequest, res: FastifyReply): Promise<void> {
    return this.clientUseCase
      .createClient(this.createClientPresenter.convertToUseCaseDTO(req))
      .then((response) =>
        this.createClientPresenter.sendResponse(res, response)
      )
      .catch((error) =>
        this.createClientPresenter.convertErrorResponse(error, res)
      );
  }

  async editClient(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<EditClientViewModel> {
    return this.clientUseCase
      .editClient(this.editClientPresenter.convertToUseCaseDTO(req))
      .then((response) => this.editClientPresenter.sendResponse(res, response))
      .catch((error) =>
        this.editClientPresenter.convertErrorResponse(error, res)
      );
  }
}
