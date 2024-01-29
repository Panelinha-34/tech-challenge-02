export interface GetOrdersQueueFormatedResponse {
  number: string;
  status: string;
  clientName: string;
}

export interface GetOrdersQueueFormatedViewModel {
  data: GetOrdersQueueFormatedResponse[];
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}
