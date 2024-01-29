import { beforeEach, describe, expect, it, vi } from "vitest";

import { AttributeConflictError } from "@/core/domain/base/errors/useCases/AttributeConflictError";
import { ResourceNotFoundError } from "@/core/domain/base/errors/useCases/ResourceNotFoundError";
import { ClientUseCase } from "@/core/useCases/client/ClientUseCase";
import { makeClient } from "@test/adapters/factories/MakeClient";
import { InMemoryClientRepository } from "@test/adapters/InMemoryClientRepository";

let inMemoryClientsRepository: InMemoryClientRepository;
let sut: ClientUseCase;

describe("Given the Edit Client Use Case", () => {
  const name = "updated name";
  const email = "updated email";

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryClientsRepository = new InMemoryClientRepository();

    sut = new ClientUseCase(inMemoryClientsRepository);
  });

  it("should edit the client correctly", async () => {
    const createdClient = makeClient();

    inMemoryClientsRepository.items.push(createdClient);

    await sut.editClient({
      id: createdClient.id.toString(),
      name,
      email,
    });

    expect(inMemoryClientsRepository.items[0]).toEqual(
      expect.objectContaining({
        email,
        name,
      })
    );
  });

  it("should throw an error when the informed 'email' already exists", async () => {
    const createdClient = makeClient({});
    const createdClient2 = makeClient({
      email: "email@email.com",
    });

    inMemoryClientsRepository.items.push(createdClient);
    inMemoryClientsRepository.items.push(createdClient2);

    await expect(() =>
      sut.editClient({
        id: createdClient.id.toString(),
        name,
        email: "email@email.com",
      })
    ).rejects.toBeInstanceOf(AttributeConflictError);
  });

  it("should throw an error when client does not exist", async () => {
    const createdClient = makeClient({});

    inMemoryClientsRepository.items.push(createdClient);

    await expect(() =>
      sut.editClient({
        id: "123",
        name,
        email,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
