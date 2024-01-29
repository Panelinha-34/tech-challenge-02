import {
  CreateOrderNotificationUseCaseRequestDTO,
  CreateOrderNotificationUseCaseResponseDTO,
} from "./dto/CreateOrderNotificationUseCaseDTO";
import {
  GetOrderNotificationsUseCaseRequestDTO,
  GetOrderNotificationsUseCaseResponseDTO,
} from "./dto/GetOrderNotificationsUseCaseDTO";

export interface IOrderNotificationUseCase {
  getNotifications(
    props: GetOrderNotificationsUseCaseRequestDTO
  ): Promise<GetOrderNotificationsUseCaseResponseDTO>;

  createOrderNotification(
    props: CreateOrderNotificationUseCaseRequestDTO
  ): Promise<CreateOrderNotificationUseCaseResponseDTO>;
}
