import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsCacheService } from './services/products-cache.service';
import { ProductsService } from './services/products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsCacheService],
})
export class ProductsModule {}
