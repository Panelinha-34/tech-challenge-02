import {
  CreateOrderUseCaseRequestDTO,
  CreateOrderUseCaseResponseDTO,
} from "./dto/CreateOrderUseCaseDTO";
import {
  GetOrderByIdUseCaseRequestDTO,
  GetOrderByIdUseCaseResponseDTO,
} from "./dto/GetOrderByIdUseCaseDTO";
import {
  GetOrdersQueueFormatedUseCaseRequestDTO,
  GetOrdersQueueFormatedUseCaseResponseDTO,
} from "./dto/GetOrdersQueueFormatedUseCaseDTO";
import {
  GetOrdersUseCaseRequestDTO,
  GetOrdersUseCaseResponseDTO,
} from "./dto/GetOrdersUseCaseDTO";
import { OrderWebHookUseCaseRequestDTO } from "./dto/OrderWebHookUseCaseDTO";
import {
  UpdateOrderStatusUseCaseRequestDTO,
  UpdateOrderStatusUseCaseResponseDTO,
} from "./dto/UpdateOrderStatusUseCaseDTO";

export interface IOrderUseCase {
  getOrders(
    props: GetOrdersUseCaseRequestDTO
  ): Promise<GetOrdersUseCaseResponseDTO>;

  getOrdersQueueFormated(
    props: GetOrdersQueueFormatedUseCaseRequestDTO
  ): Promise<GetOrdersQueueFormatedUseCaseResponseDTO>;

  getOrderById(
    props: GetOrderByIdUseCaseRequestDTO
  ): Promise<GetOrderByIdUseCaseResponseDTO>;

  createOrder(
    props: CreateOrderUseCaseRequestDTO
  ): Promise<CreateOrderUseCaseResponseDTO>;

  updateOrderStatus(
    props: UpdateOrderStatusUseCaseRequestDTO
  ): Promise<UpdateOrderStatusUseCaseResponseDTO>;

  orderWebhook(props: OrderWebHookUseCaseRequestDTO): Promise<void>;
}
