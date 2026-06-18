import { Test, TestingModule } from '@nestjs/testing';
import { ProductsCacheService } from './products-cache.service';
import { ProductsService } from './products.service';
import { StockStatus } from '../../domain/enums/stock-status.enum';

describe('ProductsService', () => {
  let service: ProductsService;
  let cacheService: ProductsCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, ProductsCacheService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    cacheService = module.get<ProductsCacheService>(ProductsCacheService);
  });

  it('should return paginated products', () => {
    const result = service.findAll({ page: 1, limit: 5 });
    expect(result.data).toHaveLength(5);
    expect(result.meta.total).toBe(20);
    expect(result.meta.page).toBe(1);
    expect(result.meta.limit).toBe(5);
    expect(result.meta.totalPages).toBe(4);
  });

  it('should filter by category', () => {
    const result = service.findAll({ page: 1, limit: 10, category: 'Food' });
    expect(result.data.every((p) => p.category === 'Food')).toBe(true);
    expect(result.meta.total).toBe(7);
  });

  it('should filter by stock_status', () => {
    const result = service.findAll({
      page: 1,
      limit: 10,
      stock_status: StockStatus.OUT_OF_STOCK,
    });
    expect(result.data.every((p) => p.stock_status === StockStatus.OUT_OF_STOCK)).toBe(true);
  });

  it('should paginate filtered results', () => {
    const result = service.findAll({ page: 2, limit: 3, category: 'Electronics' });
    expect(result.data).toHaveLength(3);
    expect(result.meta.page).toBe(2);
    expect(result.meta.total).toBe(7);
  });

  it('should return cached results for identical queries', () => {
    const query = { page: 1, limit: 5, category: 'Clothing' };
    const first = service.findAll(query);
    const cacheKey = cacheService.buildKey({
      page: 1,
      limit: 5,
      category: 'Clothing',
      stock_status: undefined,
    });
    expect(cacheService.get(cacheKey)).toEqual(first);

    const second = service.findAll(query);
    expect(second).toBe(first);
  });
});

describe('ProductsCacheService', () => {
  let cacheService: ProductsCacheService;

  beforeEach(() => {
    cacheService = new ProductsCacheService();
  });

  it('should build consistent cache keys', () => {
    const key1 = cacheService.buildKey({ page: 1, limit: 10, category: 'Food' });
    const key2 = cacheService.buildKey({ category: 'Food', limit: 10, page: 1 });
    expect(key1).toBe(key2);
  });
});
