import { Injectable } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import { PRODUCTS } from '../data/products.data';
import { ProductsQueryDto } from '../dto/products-query.dto';
import { PaginatedProductsResponse } from '../interfaces/products-response.interface';
import { ProductsCacheService } from './products-cache.service';

@Injectable()
export class ProductsService {
  constructor(private readonly cacheService: ProductsCacheService) {}

  findAll(query: ProductsQueryDto): PaginatedProductsResponse {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const cacheKey = this.cacheService.buildKey({
      page,
      limit,
      category: query.category,
      stock_status: query.stock_status,
    });

    const cached = this.cacheService.get(cacheKey);
    if (cached) {
      return cached;
    }

    const filtered = this.applyFilters(PRODUCTS, query);
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    const response: PaginatedProductsResponse = {
      data,
      meta: { total, page, limit, totalPages },
    };

    this.cacheService.set(cacheKey, response);
    return response;
  }

  private applyFilters(products: Product[], query: ProductsQueryDto): Product[] {
    let result = products;

    if (query.category) {
      result = result.filter(
        (p) => p.category.toLowerCase() === query.category!.toLowerCase(),
      );
    }

    if (query.stock_status) {
      result = result.filter((p) => p.stock_status === query.stock_status);
    }

    return result;
  }
}
