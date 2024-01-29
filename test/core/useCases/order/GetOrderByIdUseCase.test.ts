import { beforeEach, describe, expect, it, vi } from "vitest";

import { ResourceNotFoundError } from "@/core/domain/base/errors/useCases/ResourceNotFoundError";
import { ComboUseCase } from "@/core/useCases/combo/ComboUseCase";
import { IComboUseCase } from "@/core/useCases/combo/IComboUseCase";
import { OrderUseCase } from "@/core/useCases/order/OrderUseCase";
import { makeOrder } from "@test/adapters/factories/MakeOrder";
import { InMemoryClientRepository } from "@test/adapters/InMemoryClientRepository";
import { InMemoryComboProductRepository } from "@test/adapters/InMemoryComboProductRepository";
import { InMemoryComboRepository } from "@test/adapters/InMemoryComboRepository";
import { InMemoryOrderComboItemRepository } from "@test/adapters/InMemoryOrderComboRepository";
import { InMemoryOrderRepository } from "@test/adapters/InMemoryOrderRepository";
import { InMemoryProductRepository } from "@test/adapters/InMemoryProductRepository";

let inMemoryOrderRepository: InMemoryOrderRepository;
let inMemoryClientRepository: InMemoryClientRepository;
let inMemoryProductRepository: InMemoryProductRepository;
let inMemoryComboRepository: InMemoryComboRepository;
let inMemoryOrderComboItemRepository: InMemoryOrderComboItemRepository;
let inMemoryComboProductRepository: InMemoryComboProductRepository;
let comboUseCase: IComboUseCase;
let sut: OrderUseCase;

describe("Given the Get Order By Id UseCase", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryComboProductRepository = new InMemoryComboProductRepository();
    inMemoryComboRepository = new InMemoryComboRepository(
      inMemoryComboProductRepository
    );

    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderComboItemRepository
    );

    inMemoryProductRepository = new InMemoryProductRepository();
    inMemoryClientRepository = new InMemoryClientRepository();

    comboUseCase = new ComboUseCase(
      inMemoryComboRepository,
      inMemoryProductRepository
    );

    sut = new OrderUseCase(
      inMemoryOrderRepository,
      inMemoryClientRepository,
      inMemoryProductRepository,
      inMemoryComboRepository,
      comboUseCase
    );
  });

  it(`should return the order correclty`, async () => {
    const orderToCreate = makeOrder();

    inMemoryOrderRepository.items.push(orderToCreate);
    const { id } = orderToCreate;

    const { order } = await sut.getOrderById({ id: id.toString() });

    expect(order).toEqual(orderToCreate);
  });

  it("should throw 'ResourceNotFoundError' when the informed id does not exist", async () => {
    const orderToCreate = makeOrder();

    inMemoryOrderRepository.items.push(orderToCreate);

    await expect(() => sut.getOrderById({ id: "123" })).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
