import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { NastModule } from 'src/nast/nast.module';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [NastModule],
})
export class ProductsModule {}
