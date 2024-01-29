import { FastifyReply, FastifyRequest } from "fastify";

export interface IControllerPresenter<
  UseCaseRequestDTO,
  UseCaseResponseDTO,
  ControllerViewModel = void,
> {
  convertToUseCaseDTO(req: FastifyRequest): UseCaseRequestDTO;

  convertToViewModel?(model: UseCaseResponseDTO): ControllerViewModel;

  sendResponse(
    res: FastifyReply,
    useCaseResponseModel: UseCaseResponseDTO
  ): FastifyReply;

  convertErrorResponse(error: Error, res: FastifyReply): FastifyReply;
}
