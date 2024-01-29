import { Client } from "@/core/domain/entities/Client";

export interface EditClientUseCaseRequestDTO {
  id: string;
  name?: string;
  email?: string;
}

export interface EditClientUseCaseResponseDTO {
  client: Client;
}
