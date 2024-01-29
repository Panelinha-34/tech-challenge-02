import { Client } from "@/core/domain/entities/Client";

export interface CreateClientUseCaseRequestDTO {
  name: string;
  email: string;
  taxVat: string;
}

export interface CreateClientUseCaseResponseDTO {
  client: Client;
}
