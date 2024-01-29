export interface UpdateOrderStatusViewModel {
  id: string;
  status: string;
  clientId?: string;
  visitorName?: string;
  paymentMethod: string;
  totalPrice: number;
  createdAt: string;
  updatedAt?: string;
}
