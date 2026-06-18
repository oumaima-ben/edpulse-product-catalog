export const StockStatus = {
  IN_STOCK: 'in_stock',
  LOW_STOCK: 'low_stock',
  OUT_OF_STOCK: 'out_of_stock',
} as const;

export type StockStatus = (typeof StockStatus)[keyof typeof StockStatus];

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock_status: StockStatus;
}

export interface ProductsMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductsResponse {
  data: Product[];
  meta: ProductsMeta;
}

export interface ProductsQuery {
  page: number;
  limit: number;
  category?: string;
  stock_status?: StockStatus;
}
