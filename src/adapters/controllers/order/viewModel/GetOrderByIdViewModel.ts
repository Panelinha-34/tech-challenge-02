export interface GetOrderByIdViewModel {
  id: string;
  number: string;
  clientId?: string;
  status: string;
  totalPrice: number;
  paymentMethod: string;
  createdAt: string;
  visitorName?: string;
  updatedAt?: string;
  combos: {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    annotation?: string;
  }[];
}
