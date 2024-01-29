import { Client } from "@/core/domain/entities/Client";

export interface GetClientByIdUseCaseRequestDTO {
  id: string;
}

export interface GetClientByIdUseCaseResponseDTO {
  client: Client;
}
