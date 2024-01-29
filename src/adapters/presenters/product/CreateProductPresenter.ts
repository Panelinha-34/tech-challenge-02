/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyReply, FastifyRequest } from "fastify";

import { createProductPayloadSchema } from "@/adapters/controllers/product/schema/CreateProductSchema";
import {
  CreateProductUseCaseRequestDTO,
  CreateProductUseCaseResponseDTO,
} from "@/core/useCases/product/dto/CreateProductUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class CreateProductPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      CreateProductUseCaseRequestDTO,
      CreateProductUseCaseResponseDTO
    >
{
  convertToUseCaseDTO(req: FastifyRequest): CreateProductUseCaseRequestDTO {
    const { name, description, price, category } =
      createProductPayloadSchema.parse(req.body);

    return {
      name,
      description,
      price,
      category,
    };
  }

  sendResponse(
    res: FastifyReply,
    _useCaseResponseModel: CreateProductUseCaseResponseDTO
  ) {
    return res.status(201).send();
  }
}
