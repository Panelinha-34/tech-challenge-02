import { beforeEach, describe, expect, it, vi } from "vitest";

import { ClientUseCase } from "@/core/useCases/client/ClientUseCase";
import { makeClient } from "@test/adapters/factories/MakeClient";
import { InMemoryClientRepository } from "@test/adapters/InMemoryClientRepository";

let inMemoryClientsRepository: InMemoryClientRepository;
let sut: ClientUseCase;

describe("Given the Check By Taxvat Use Case", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryClientsRepository = new InMemoryClientRepository();

    sut = new ClientUseCase(inMemoryClientsRepository);
  });

  it("should check the taxvat correctly", async () => {
    const clientToCreate = makeClient();
    inMemoryClientsRepository.items.push(clientToCreate);

    const taxvat = clientToCreate.taxVat.number;

    const { exist } = await sut.checkByTaxvat({ taxvat });

    expect(exist).toBe(true);
  });

  it("should return correctly when there is no client with the requested taxvat", async () => {
    const clientToCreate = makeClient();
    inMemoryClientsRepository.items.push(clientToCreate);

    const taxvat = "123";

    const { exist } = await sut.checkByTaxvat({ taxvat });

    expect(exist).toBe(false);
  });
});
