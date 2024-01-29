import { AttributeConflictError } from "@/core/domain/base/errors/useCases/AttributeConflictError";
import { ResourceNotFoundError } from "@/core/domain/base/errors/useCases/ResourceNotFoundError";
import { Client } from "@/core/domain/entities/Client";
import { Taxvat } from "@/core/domain/valueObjects/Taxvat";
import { IClientRepository } from "@/core/interfaces/repositories/IClientRepository";

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
import { IClientUseCase } from "./IClientUseCase";

export class ClientUseCase implements IClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async getClients({
    params,
  }: GetClientsUseCaseRequestDTO): Promise<GetClientsUseCaseResponseDTO> {
    const paginationResponse = await this.clientRepository.findMany(params);

    return { paginationResponse };
  }

  async checkByTaxvat({
    taxvat,
  }: CheckClientByTaxvatUseCaseRequestDTO): Promise<CheckClientByTaxvatUseCaseResponseDTO> {
    const client = await this.clientRepository.findByTaxVat(taxvat);

    if (!client) {
      return { exist: false };
    }

    return { exist: true };
  }

  async getClientById({
    id,
  }: GetClientByIdUseCaseRequestDTO): Promise<GetClientByIdUseCaseResponseDTO> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new ResourceNotFoundError(Client.name);
    }

    return { client };
  }

  async createClient({
    email,
    name,
    taxVat,
  }: CreateClientUseCaseRequestDTO): Promise<CreateClientUseCaseResponseDTO> {
    const hasClientWithSameTaxVat =
      await this.clientRepository.findByTaxVat(taxVat);

    if (hasClientWithSameTaxVat) {
      throw new AttributeConflictError<Client>("taxVat", Client.name);
    }

    const hasClientWithSameEmail =
      await this.clientRepository.findByEmail(email);

    if (hasClientWithSameEmail) {
      throw new AttributeConflictError<Client>("email", Client.name);
    }

    const client = await this.clientRepository.create(
      new Client({
        email,
        name,
        taxVat: new Taxvat({ number: taxVat }),
      })
    );

    return { client };
  }

  async editClient({
    id,
    email,
    name,
  }: EditClientUseCaseRequestDTO): Promise<EditClientUseCaseResponseDTO> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new ResourceNotFoundError(Client.name);
    }

    if (email) {
      const hasClientWithSameEmail =
        await this.clientRepository.findByEmail(email);

      if (hasClientWithSameEmail && hasClientWithSameEmail.id !== client.id) {
        throw new AttributeConflictError<Client>("email", Client.name);
      }
      client.email = email;
    }

    if (name) {
      client.name = name;
    }

    const updatedClient = await this.clientRepository.update(client);

    return { client: updatedClient };
  }
}
