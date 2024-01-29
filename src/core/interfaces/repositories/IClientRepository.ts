import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Client } from "@/core/domain/entities/Client";

export interface IClientRepository {
  findMany(params: PaginationParams): Promise<PaginationResponse<Client>>;

  findById(id: string): Promise<Client | null>;

  findByTaxVat(taxVat: string): Promise<Client | null>;

  findByEmail(email: string): Promise<Client | null>;

  create(client: Client): Promise<Client>;

  update(client: Client): Promise<Client>;
}
