interface GetOrderNotificationsResponse {
  id: string;
  orderId: string;
  clientId: string;
  status: string;
  message: string;
  createdAt: string;
  updatedAt?: string;
}

export interface GetOrderNotificationsViewModel {
  data: GetOrderNotificationsResponse[];
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}
