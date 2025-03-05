import { BadRequestException, Body, Controller, Delete, Get, Inject, Param,  ParseIntPipe,  Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, Payload, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { paginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';

import{CreateProductDto, UpdateProductDto} from 'src/products/dto/index'

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProducts(@Payload()CreateProductDto:CreateProductDto){
    return this.productsClient.send({cmd: 'create_product'},CreateProductDto);
  }

  @Get()
  findAllProduct(@Query()paginationDto:paginationDto){
    return this.productsClient.send({cmd: 'find_all_product'},paginationDto);
  }
  
  
  @Get(':id')
  async  findOneProduct(@Param('id')id:string){
    
 console.log('estoy haciendo la peticion ');
    try {
      const product= await firstValueFrom(
        this.productsClient.send({cmd: 'find_one_product'},{id})
      );
        return product;
      
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
     
           
    }
  }

  @Delete(':id')
  deleteProduct(@Param('id')id:string){
    return this.productsClient.send({cmd: 'delete_product'},{id}).pipe(
      catchError(err => {throw new RpcException(err)})
    )
  }


  @Patch(':id')
  patchProduct(
  @Param('id',ParseIntPipe)id:number,
  @Payload()UpdateProductDto:UpdateProductDto){
   return this.productsClient.send({cmd: 'update_product'},{
      id,
      ...UpdateProductDto
    }).pipe(
      catchError(err => {throw new RpcException(err)})
    )
  }
}
