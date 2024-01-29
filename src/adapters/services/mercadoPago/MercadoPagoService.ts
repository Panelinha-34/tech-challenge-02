/* eslint-disable @typescript-eslint/naming-convention */
import { Order } from "@/core/domain/entities/Order";
import { IPaymentService } from "@/core/interfaces/services/IPaymentService";

import api from "./api";
import { OrderToCreatePaymentRequestConverter } from "./converters/OrderToCreatePaymentRequestConverter";
import { CreatePaymentResponse } from "./model/CreatePaymentResponse";
import { GetOrderStatusResponse } from "./model/GetOrderStatusResponse";

export class MercadoPagoService implements IPaymentService {
  async createPayment(order: Order): Promise<{
    qrCode: string;
  }> {
    const ENDPOINT =
      "/instore/orders/qr/seller/collectors/{userId}/pos/{externalPOSId}/qrs";

    const request = OrderToCreatePaymentRequestConverter.convert(order);

    const { data } = await api.post<CreatePaymentResponse>(
      ENDPOINT.replace("{userId}", "359694122").replace(
        "{externalPOSId}",
        "SUC001"
      ),
      request
    );

    const { qr_data: qrCode } = data;

    return {
      qrCode,
    };
  }

  async getOrderStatus(
    platformOrderId: string
  ): Promise<{ status: string; orderId: string }> {
    const ENDPOINT = "merchant_orders/{platformOrderId}";

    const { data } = await api.get<GetOrderStatusResponse>(
      ENDPOINT.replace("{platformOrderId}", platformOrderId)
    );

    const { order_status: status, external_reference: orderId } = data;

    return {
      status,
      orderId,
    };
  }
}
