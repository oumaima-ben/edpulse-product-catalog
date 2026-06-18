import { Controller, Get, Query } from '@nestjs/common';
import { ProductsQueryDto } from '../dto/products-query.dto';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query() query: ProductsQueryDto) {
    return this.productsService.findAll(query);
  }
}
