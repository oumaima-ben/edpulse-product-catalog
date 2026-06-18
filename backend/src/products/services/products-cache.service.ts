import { Injectable } from '@nestjs/common';
import { PaginatedProductsResponse } from '../interfaces/products-response.interface';

@Injectable()
export class ProductsCacheService {
  private readonly cache = new Map<string, PaginatedProductsResponse>();

  get(key: string): PaginatedProductsResponse | undefined {
    return this.cache.get(key);
  }

  set(key: string, value: PaginatedProductsResponse): void {
    this.cache.set(key, value);
  }

  buildKey(params: Record<string, string | number | undefined>): string {
    const sorted = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key] ?? ''}`)
      .join('&');
    return sorted;
  }
}
