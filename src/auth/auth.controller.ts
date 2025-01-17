import { Controller, Post, Body, Req, UseGuards, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/create-auth.dto';
import { Roles } from './roles.decorator';
import { RolesGuard} from './roles.guard';
import { SecurityService } from 'src/ip/security.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly securityService: SecurityService,
  ) {}
  
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Req() request: any) {
    return this.authService.login(loginDto, request);
  }
  
}