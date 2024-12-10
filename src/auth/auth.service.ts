import { ConflictException, Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto/create-auth.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ){}

  async register(registerDto: RegisterDto): Promise<any> {
    const { username, password, confirmPassword, rol } = registerDto;
    
    if (password !== confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }
  
    const existingUser = await this.usuarioService.findByUsername(username);
    if (existingUser) {
      throw new ConflictException('El usuario ya está registrado');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const usuarioData: CreateUsuarioDto = {
      username,
      password: hashedPassword,
      rol: rol || 'Profesor'
    };
    const usuario = await this.usuarioService.create(usuarioData);
  
    return { message: 'Usuario registrado correctamente' };
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string, message: string }> {
    const { username, password } = loginDto;
    const usuario = await this.usuarioService.findByUsername(username);
  
    if (!usuario) {
      console.log('Usuario no encontrado');
      throw new UnauthorizedException('Credenciales incorrectas');
    }
  
    const isPasswordValid = await bcrypt.compare(password, usuario.password);
    if (!isPasswordValid) {
      console.log('Contraseña incorrecta');
      throw new UnauthorizedException('Credenciales incorrectas');
    }
  
    const payload = { username: usuario.username, sub: usuario.id, rol: usuario.rol, profesorId: usuario.profesor?.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, message: 'El usuario ha logrado acceder' };
  }
}