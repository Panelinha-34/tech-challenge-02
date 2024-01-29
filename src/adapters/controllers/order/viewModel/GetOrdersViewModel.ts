export interface GetOrdersResponse {
  id: string;
  number: string;
  status: string;
  clientId?: string;
  visitorName?: string;
  paymentMethod: string;
  paymentDetails?: string;
  totalPrice: number;
  createdAt: string;
  updatedAt?: string;
}

export interface GetOrdersViewModel {
  data: GetOrdersResponse[];
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}
