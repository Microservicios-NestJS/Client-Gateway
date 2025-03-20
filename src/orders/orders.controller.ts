import { Controller, Get, Post, Body, Patch, Param,  Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { NATS_SERVERS } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { paginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
 constructor(
    @Inject(NATS_SERVERS) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.productsClient.send({cmd: 'createOrder'},createOrderDto);
  }

  @Get()
  async findAll(@Query()orderPaginationDto:OrderPaginationDto) {
    
    try {
      const order=await firstValueFrom(
        this.productsClient.send({cmd: 'findAllOrders'},orderPaginationDto)
        );
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('id/:id')
  async findOne(@Param('id',ParseUUIDPipe) id: string) {
    try {
      const order=await firstValueFrom(
         this.productsClient.send({cmd: 'findOneOrder'},{id})
        );
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto:paginationDto,
  ) {
    try {
      return this.productsClient.send({cmd: 'findAllOrders'},{
        ...paginationDto,
        status:statusDto.status,
      });

    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  chageStatus(
    @Param('id',ParseUUIDPipe)id:string,
    @Body() statusDto:StatusDto,
  ){
   try {
   return this.productsClient.send({cmd:'changeOrderStatus'},{
      id,status:statusDto.status
    })
   } catch (error) {
    throw new RpcException(error);
   }
  }
 
}
