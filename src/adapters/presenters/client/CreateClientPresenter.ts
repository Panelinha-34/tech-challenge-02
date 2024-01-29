/* eslint-disable @typescript-eslint/no-unused-vars */

import { FastifyReply, FastifyRequest } from "fastify";

import { createClientPayloadSchema } from "@/adapters/controllers/client/schemas/CreateClientSchema";
import {
  CreateClientUseCaseRequestDTO,
  CreateClientUseCaseResponseDTO,
} from "@/core/useCases/client/dto/CreateClientUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class CreateClientPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      CreateClientUseCaseRequestDTO,
      CreateClientUseCaseResponseDTO
    >
{
  convertToUseCaseDTO(req: FastifyRequest): CreateClientUseCaseRequestDTO {
    const { email, name, taxVat } = createClientPayloadSchema.parse(req.body);

    return {
      email,
      name,
      taxVat,
    };
  }

  sendResponse(
    res: FastifyReply,
    _useCaseResponseModel: CreateClientUseCaseResponseDTO
  ) {
    return res.status(201).send();
  }
}
