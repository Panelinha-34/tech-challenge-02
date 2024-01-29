export interface ProductViewModel {
  id: string;
  name: string;
  description: string;
  active: boolean;
  price: number;
  category: string;
  createdAt: string;
  updatedAt?: string;
}

export interface GetProductsViewModel {
  data: ProductViewModel[];
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}
