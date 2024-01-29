export interface CreatePaymentRequest {
  description: string;
  external_reference: string;
  items: Item[];
  notification_url: string;
  title: string;
  total_amount: number;
}

export interface Item {
  sku_number: string;
  category: string;
  title: string;
  description: string;
  unit_price: number;
  quantity: number;
  unit_measure: string;
  total_amount: number;
}
