export interface GetComboByIdViewModel {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt?: string;
  products: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    createdAt: string;
    updatedAt?: string;
  }[];
}
