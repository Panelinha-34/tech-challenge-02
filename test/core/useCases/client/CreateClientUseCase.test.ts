import { beforeEach, describe, expect, it, vi } from "vitest";

import { AttributeConflictError } from "@/core/domain/base/errors/useCases/AttributeConflictError";
import { Taxvat } from "@/core/domain/valueObjects/Taxvat";
import { ClientUseCase } from "@/core/useCases/client/ClientUseCase";
import { makeClient } from "@test/adapters/factories/MakeClient";
import { InMemoryClientRepository } from "@test/adapters/InMemoryClientRepository";

let inMemoryClientsRepository: InMemoryClientRepository;
let sut: ClientUseCase;

describe("Given the Create Client Use Case", () => {
  const name = "john doe";
  const email = "john.doe@test.com";
  const taxVat = "1231231231";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryClientsRepository = new InMemoryClientRepository();

    sut = new ClientUseCase(inMemoryClientsRepository);
  });

  it("should create the client correctly", async () => {
    await sut.createClient({
      name,
      email,
      taxVat,
    });

    expect(
      inMemoryClientsRepository.items.filter((c) => c.taxVat.number === taxVat)
    ).toHaveLength(1);
  });

  it("should throw an error when the informed 'email' already exists", async () => {
    const createdClient = makeClient({
      email,
    });

    inMemoryClientsRepository.items.push(createdClient);

    await expect(() =>
      sut.createClient({
        name,
        email,
        taxVat,
      })
    ).rejects.toBeInstanceOf(AttributeConflictError);
  });

  it("should throw an error when the informed 'taxvat' already exists", async () => {
    const createdClient = makeClient({
      taxVat: new Taxvat({ number: taxVat }),
    });

    inMemoryClientsRepository.items.push(createdClient);

    await expect(() =>
      sut.createClient({
        name,
        email,
        taxVat,
      })
    ).rejects.toBeInstanceOf(AttributeConflictError);
  });
});
