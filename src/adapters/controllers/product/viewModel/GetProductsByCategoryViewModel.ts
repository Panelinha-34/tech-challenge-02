export interface GetProductsByCategoryResponse {
  id: string;
  name: string;
  price: number;
  active: boolean;
  description: string;
  category: string;
  createdAt: string;
  updatedAt?: string;
}

export interface GetProductsByCategoryViewModel {
  data: GetProductsByCategoryResponse[];
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}
