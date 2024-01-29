import { beforeEach, describe, expect, it, vi } from "vitest";

import { PaginationParams } from "@/core/domain/base/PaginationParams";
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

describe("Given the Get Orders Use Case", () => {
  const page = 1;
  const size = 10;

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

  it("should return the orders correctly", async () => {
    const params = new PaginationParams(page, size);

    const orderToCreate = makeOrder();

    inMemoryOrderRepository.items.push(orderToCreate);

    const { paginationResponse } = await sut.getOrders({ params });

    const orders = paginationResponse.data;

    expect(orders).toHaveLength(1);
  });

  it("should return the orders from the second pagination correctly", async () => {
    const params = new PaginationParams(2, size);

    Array.from({ length: 12 }).forEach(() => {
      inMemoryOrderRepository.items.push(makeOrder());
    });

    const { paginationResponse } = await sut.getOrders({ params });

    const orders = paginationResponse.data;

    expect(orders).toHaveLength(2);
  });
});
