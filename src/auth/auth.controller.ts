import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/create-auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}
  
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  
  @Post('login')
  async login(
    @Body() loginDto: LoginDto, 
    @Req () request: any,
    @Res({ passthrough: true }) response: Response) {
    return this.authService.login(loginDto, request, response);
  }

  @Post('logout')
  async logout(@Req() request: any, @Res({ passthrough: true }) response: Response) {
    return this.authService.logout(request, response);
  }
  
}