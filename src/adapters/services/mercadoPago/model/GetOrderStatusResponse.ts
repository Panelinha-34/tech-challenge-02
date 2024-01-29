export interface GetOrderStatusResponse {
  id: number;
  status: string;
  external_reference: string;
  preference_id: string;
  collector: Collector;
  marketplace: string;
  notification_url: string;
  date_created: string;
  last_updated: string;
  shipping_cost: number;
  total_amount: number;
  site_id: string;
  paid_amount: number;
  refunded_amount: number;
  items: Item[];
  cancelled: boolean;
  additional_info: string;
  is_test: boolean;
  order_status: string;
}

interface Item {
  id: string;
  category_id: string;
  currency_id: string;
  description: string;
  title: string;
  quantity: number;
  unit_price: number;
}

interface Collector {
  id: number;
  email: string;
  nickname: string;
}
