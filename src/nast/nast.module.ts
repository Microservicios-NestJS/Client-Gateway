import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVERS } from 'src/config';


@Module({
    imports:[   ClientsModule.register([
        { name: NATS_SERVERS, 
        transport: Transport.NATS,
         options:{
          servers: envs.NATS_SERVERS,
         } 
      },
      ]),],
      exports:[   ClientsModule.register([
        { name: NATS_SERVERS, 
        transport: Transport.NATS,
         options:{
          servers: envs.NATS_SERVERS,
         } 
      },
      ]),]
})
export class NastModule {}
