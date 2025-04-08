import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVERS } from 'src/config';
import { LogginuserDto, RegisterUserDto } from './dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { User,token } from './decorators';
import { CurrentUser } from './interface/current-user.interface';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVERS) private readonly Client: ClientProxy,
){}


  @Post('register')
  registerUser(@Body()registerUserDto:RegisterUserDto){
    return this.Client.send({cmd:'auth.regiter.user'},registerUserDto)
    .pipe(
      catchError(error=>{
        throw new RpcException(error);
      }),
    )
  }
  



  @Post('login')
  loginUser(@Body()logginUserDto:LogginuserDto){
    return this.Client.send({cmd:'auth.login.user'},logginUserDto)
    .pipe(
      catchError(error=>{
        throw new RpcException(error);
      }),
    )
  }
  @UseGuards(AuthGuard)
  @Get('verify')
  verifyUser(@User()user:CurrentUser, @token()token:string){
    return this.Client.send({cmd:'auth.verify.user'},token);
  }
}
