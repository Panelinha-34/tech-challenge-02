export interface GetProductByIdViewModel {
  id: string;
  name: string;
  description: string;
  active: boolean;
  price: number;
  category: string;
  createdAt: string;
  updatedAt?: string;
}
