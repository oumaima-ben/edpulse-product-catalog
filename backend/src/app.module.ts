import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { existsSync } from 'fs';
import { join } from 'path';
import { ProductsModule } from './products/products.module';

const publicPath = join(__dirname, '..', 'public');
const staticImports =
  process.env.NODE_ENV === 'production' && existsSync(publicPath)
    ? [
        ServeStaticModule.forRoot({
          rootPath: publicPath,
          exclude: ['/products*'],
        }),
      ]
    : [];

@Module({
  imports: [ProductsModule, ...staticImports],
})
export class AppModule {}
