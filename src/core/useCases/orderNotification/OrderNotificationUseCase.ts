import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { OrderNotification } from "@/core/domain/entities/OrderNotification";
import { NotificationStatusEnum } from "@/core/domain/enums/NotificationStatusEnum";
import { NotificationStatus } from "@/core/domain/valueObjects/NotificationStatus";
import { IOrderNotificationRepository } from "@/core/interfaces/repositories/IOrderNotificationRepository";

import {
  CreateOrderNotificationUseCaseRequestDTO,
  CreateOrderNotificationUseCaseResponseDTO,
} from "./dto/CreateOrderNotificationUseCaseDTO";
import {
  GetOrderNotificationsUseCaseRequestDTO,
  GetOrderNotificationsUseCaseResponseDTO,
} from "./dto/GetOrderNotificationsUseCaseDTO";
import { IOrderNotificationUseCase } from "./IOrderNotificationUseCase";

export class OrderNotificationUseCase implements IOrderNotificationUseCase {
  constructor(
    private orderNotificationRepository: IOrderNotificationRepository
  ) {}

  async createOrderNotification({
    clientId,
    orderId,
    message,
  }: CreateOrderNotificationUseCaseRequestDTO): Promise<CreateOrderNotificationUseCaseResponseDTO> {
    const orderNotification = new OrderNotification({
      clientId: new UniqueEntityId(clientId),
      orderId: new UniqueEntityId(orderId),
      status: new NotificationStatus({ name: NotificationStatusEnum.PENDING }),
      message,
    });

    const createdOrderNotification =
      await this.orderNotificationRepository.create(orderNotification);

    return { orderNotification: createdOrderNotification };
  }

  async getNotifications(
    props: GetOrderNotificationsUseCaseRequestDTO
  ): Promise<GetOrderNotificationsUseCaseResponseDTO> {
    const paginationResponse = await this.orderNotificationRepository.findMany(
      props.params
    );

    return { paginationResponse };
  }
}
