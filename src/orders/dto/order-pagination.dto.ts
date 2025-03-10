
import { IsEnum, IsOptional } from 'class-validator';
import { paginationDto } from 'src/common';
import { OrderStatus, OrderStatusList } from '../enum/order.enum';

export class OrderPaginationDto extends paginationDto {
    
    @IsOptional()   
    @IsEnum(OrderStatusList,{
            message: `valid status are ${OrderStatusList}`
        })
        status : OrderStatus;
}
