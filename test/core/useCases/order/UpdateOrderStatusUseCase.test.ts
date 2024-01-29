import { beforeEach, describe, expect, it, vi } from "vitest";

import { MercadoPagoService } from "@/adapters/services/mercadoPago/MercadoPagoService";
import { ValueObjectValidationError } from "@/core/domain/base/errors/valueObjects/ValueObjectValidationError";
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

describe("Given the Update Order Use Case", () => {
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

  it("should update the order status correctly", async () => {
    const orderPendingPayment = makeOrder({
      status: new OrderStatus({ name: OrderStatusEnum.PENDING_PAYMENT }),
    });
    inMemoryOrderRepository.items.push(orderPendingPayment);

    const { order } = await sut.updateOrderStatus({
      id: orderPendingPayment.id.toString(),
      status: "RECEIVED",
    });

    const updatedOrderInDatabase = inMemoryOrderRepository.items.find(
      (updatedOrder) =>
        updatedOrder.id.toString() === orderPendingPayment.id.toString()
    );

    expect(order.status.name).toBe("RECEIVED");
    expect(updatedOrderInDatabase?.status.name).toBe("RECEIVED");
  });

  it("should not allow to status be changed to a previously status", async () => {
    const orderPendingPayment = makeOrder({
      status: new OrderStatus({ name: OrderStatusEnum.RECEIVED }),
    });
    inMemoryOrderRepository.items.push(orderPendingPayment);

    await expect(async () =>
      sut.updateOrderStatus({
        id: orderPendingPayment.id.toString(),
        status: OrderStatusEnum.PENDING_PAYMENT.toString(),
      })
    ).rejects.toBeInstanceOf(ValueObjectValidationError);
  });
});
