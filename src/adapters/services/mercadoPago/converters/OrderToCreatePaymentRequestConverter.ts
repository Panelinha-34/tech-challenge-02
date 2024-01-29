import { Order } from "@/core/domain/entities/Order";

import { CreatePaymentRequest, Item } from "../model/CreatePaymentRequest";

export class OrderToCreatePaymentRequestConverter {
  static convert(order: Order): CreatePaymentRequest {
    const items: Item[] = order.combos.getItems().map((combo) => ({
      sku_number: combo.id.toString(),
      category: "combo",
      title: combo.comboId.toString(),
      description: combo.comboId.toString(),
      unit_price: combo.totalPrice,
      quantity: 1,
      unit_measure: "unit",
      total_amount: combo.totalPrice,
    }));

    const paymentRequest: CreatePaymentRequest = {
      description: order.id.toString(),
      external_reference: order.id.toString(),
      items,
      notification_url:
        "https://webhook.site/ad40ef19-51ed-4b1c-bd03-98a92f99550a",
      title: order.id.toString(),
      total_amount: order.totalPrice,
    };

    return paymentRequest;
  }
}
