import {
  CheckClientByTaxvatUseCaseRequestDTO,
  CheckClientByTaxvatUseCaseResponseDTO,
} from "./dto/CheckClientByTaxvatUseCaseDTO";
import {
  CreateClientUseCaseRequestDTO,
  CreateClientUseCaseResponseDTO,
} from "./dto/CreateClientUseCaseDTO";
import {
  EditClientUseCaseRequestDTO,
  EditClientUseCaseResponseDTO,
} from "./dto/EditClientUseCaseDTO";
import {
  GetClientByIdUseCaseRequestDTO,
  GetClientByIdUseCaseResponseDTO,
} from "./dto/GetClientByIdUseCaseDTO";
import {
  GetClientsUseCaseRequestDTO,
  GetClientsUseCaseResponseDTO,
} from "./dto/GetClientsUseCaseDTO";

export interface IClientUseCase {
  getClients(
    props: GetClientsUseCaseRequestDTO
  ): Promise<GetClientsUseCaseResponseDTO>;

  checkByTaxvat(
    props: CheckClientByTaxvatUseCaseRequestDTO
  ): Promise<CheckClientByTaxvatUseCaseResponseDTO>;

  getClientById(
    props: GetClientByIdUseCaseRequestDTO
  ): Promise<GetClientByIdUseCaseResponseDTO>;

  createClient(
    props: CreateClientUseCaseRequestDTO
  ): Promise<CreateClientUseCaseResponseDTO>;

  editClient(
    props: EditClientUseCaseRequestDTO
  ): Promise<EditClientUseCaseResponseDTO>;
}
