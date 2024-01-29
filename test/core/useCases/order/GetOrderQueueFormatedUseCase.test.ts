import { beforeEach, describe, expect, it, vi } from "vitest";

import { MercadoPagoService } from "@/adapters/services/mercadoPago/MercadoPagoService";
import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { OrderStatusEnum } from "@/core/domain/enums/OrderStatusEnum";
import { OrderStatus } from "@/core/domain/valueObjects/OrderStatus";
import { IPaymentService } from "@/core/interfaces/services/IPaymentService";
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
let paymentService: IPaymentService;
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

    paymentService = new MercadoPagoService();

    sut = new OrderUseCase(
      inMemoryOrderRepository,
      inMemoryClientRepository,
      inMemoryProductRepository,
      inMemoryComboRepository,
      paymentService,
      comboUseCase
    );
  });

  it(`should return the with the filtered status correctlt and ordered correctly`, async () => {
    const params = new PaginationParams(page, size);

    const orderPendingPayment = makeOrder({
      status: new OrderStatus({ name: OrderStatusEnum.PENDING_PAYMENT }),
    });

    const orderPaid = makeOrder({
      status: new OrderStatus({ name: OrderStatusEnum.RECEIVED }),
    });

    const orderInPreparation = makeOrder({
      status: new OrderStatus({ name: OrderStatusEnum.IN_PREPARATION }),
    });

    const orderReady = makeOrder({
      status: new OrderStatus({ name: OrderStatusEnum.READY }),
    });

    const orderDelivered = makeOrder({
      status: new OrderStatus({ name: OrderStatusEnum.DELIVERED }),
    });

    const orderCompleted = makeOrder({
      status: new OrderStatus({ name: OrderStatusEnum.COMPLETED }),
    });

    const orderCancelled = makeOrder({
      status: new OrderStatus({ name: OrderStatusEnum.CANCELLED }),
    });

    inMemoryOrderRepository.items.push(orderPendingPayment);
    inMemoryOrderRepository.items.push(orderPaid);
    inMemoryOrderRepository.items.push(orderInPreparation);
    inMemoryOrderRepository.items.push(orderReady);
    inMemoryOrderRepository.items.push(orderDelivered);
    inMemoryOrderRepository.items.push(orderCompleted);
    inMemoryOrderRepository.items.push(orderCancelled);

    const { paginationResponse } = await sut.getOrdersQueueFormated({ params });

    const orders = paginationResponse.data;

    const expectNotPendingPayment = !orders.some(
      (order) => order.status.name === OrderStatusEnum.PENDING_PAYMENT
    );

    const expectNotCancelled = !orders.some(
      (order) => order.status.name === OrderStatusEnum.CANCELLED
    );

    const expectNotCompleted = !orders.some(
      (order) => order.status.name === OrderStatusEnum.COMPLETED
    );

    const expectNotDelivered = !orders.some(
      (order) => order.status.name === OrderStatusEnum.DELIVERED
    );

    expect(expectNotPendingPayment).toBe(true);
    expect(expectNotCancelled).toBe(true);
    expect(expectNotCompleted).toBe(true);
    expect(expectNotDelivered).toBe(true);

    expect(orders).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          status: expect.objectContaining({
            name: OrderStatusEnum.READY,
          }),
        }),
        expect.objectContaining({
          status: expect.objectContaining({
            name: OrderStatusEnum.IN_PREPARATION,
          }),
        }),
        expect.objectContaining({
          status: expect.objectContaining({
            name: OrderStatusEnum.RECEIVED,
          }),
        }),
      ])
    );
  });
});
