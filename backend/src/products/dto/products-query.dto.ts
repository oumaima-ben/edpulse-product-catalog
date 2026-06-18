import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { StockStatus } from '../../domain/enums/stock-status.enum';

export class ProductsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'page must be an integer' })
  @Min(1, { message: 'page must be at least 1' })
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'limit must be an integer' })
  @Min(1, { message: 'limit must be at least 1' })
  @Max(100, { message: 'limit must not exceed 100' })
  limit?: number = 10;

  @IsOptional()
  @IsString({ message: 'category must be a string' })
  category?: string;

  @IsOptional()
  @IsEnum(StockStatus, {
    message: `stock_status must be one of: ${Object.values(StockStatus).join(', ')}`,
  })
  stock_status?: StockStatus;
}
