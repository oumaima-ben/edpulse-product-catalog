import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';

describe('Products (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /products returns paginated products', () => {
    return request(app.getHttpServer())
      .get('/products?page=1&limit=5')
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toHaveLength(5);
        expect(res.body.meta).toMatchObject({ page: 1, limit: 5, total: 20 });
      });
  });

  it('GET /products filters by category', () => {
    return request(app.getHttpServer())
      .get('/products?category=Electronics')
      .expect(200)
      .expect((res) => {
        expect(res.body.data.every((p: { category: string }) => p.category === 'Electronics')).toBe(true);
      });
  });

  it('GET /products filters by stock_status', () => {
    return request(app.getHttpServer())
      .get('/products?stock_status=in_stock')
      .expect(200)
      .expect((res) => {
        expect(res.body.data.every((p: { stock_status: string }) => p.stock_status === 'in_stock')).toBe(true);
      });
  });

  it('GET /products rejects invalid page', () => {
    return request(app.getHttpServer())
      .get('/products?page=0')
      .expect(400);
  });

  it('GET /products rejects unknown query params', () => {
    return request(app.getHttpServer())
      .get('/products?foo=bar')
      .expect(400);
  });
});
