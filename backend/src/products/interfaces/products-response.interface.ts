import { Product } from '../../domain/entities/product.entity';

export interface PaginatedProductsResponse {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
