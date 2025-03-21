
import 'dotenv/config';
import  * as joi  from 'joi';


interface EnvVars{
    PORT:number;
    //PRODUCTS_MICROSERVICE_HOST:string;
    //PRODUCTS_MICROSERVICE_PORT:number;
    //ORDERS_MICROSERVICE_HOST:string;
    //ORDERS_MICROSERVICE_PORT:number;
    NATS_SERVERS:string[];

}

const envScherma= joi.object({
    PORT:joi.number().required(),
   // PRODUCTS_MICROSERVICE_HOST:joi.string().required(),
   // PRODUCTS_MICROSERVICE_PORT:joi.number().required(),
   // ORDERS_MICROSERVICE_HOST: joi.string().required(),
   // ORDERS_MICROSERVICE_PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),

    
})
.unknown(true);


const {error,value} =envScherma.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(','),

});

if(error){
    throw new Error(`config validation error ${error.message } `);

}

const envVars: EnvVars= value;

export const envs= {
    port:envVars.PORT,
   // PRODUCTS_MICROSERVICE_HOST:envVars.PRODUCTS_MICROSERVICE_HOST,
   // PRODUCTS_MICROSERVICE_PORT:envVars.PRODUCTS_MICROSERVICE_PORT,
   // ORDERS_MICROSERVICE_HOST:envVars.ORDERS_MICROSERVICE_HOST,
   // ORDERS_MICROSERVICE_PORT:envVars.ORDERS_MICROSERVICE_PORT,
    NATS_SERVERS:envVars.NATS_SERVERS,
}