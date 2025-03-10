import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";

export class CreateOrderDto {

    @IsNumber()
    @IsPositive()
    totalAmount:number;
    
    @IsNumber()
    @IsPositive()
    totaItems:number;
    
    @IsEnum(OrderStatusList,{
        message: `Possible status value are ${OrderStatusList}`
    })
    status : OrderStatus= OrderStatus.PENDIENTE;
    
    @IsBoolean()
    @IsOptional()
    paid: boolean = false;
}
