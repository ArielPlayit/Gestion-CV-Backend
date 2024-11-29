import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto/create-auth.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ){}

  async register(registerDto: RegisterDto): Promise<any> {
    const { username, password, rol } = registerDto;
    
    const existingUser = await this.usuarioService.findByUsername(username);
    if (existingUser) {
      throw new ConflictException('El usuario ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const usuario = await this.usuarioService.create({
      ...registerDto,
      password: hashedPassword,
      rol: rol || 'Profesor'
    });

    return { message: 'Usuario registrado correctamente' };
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string, message: string }> {
    const { username, password } = loginDto;
    const usuario = await this.usuarioService.findByUsername(username);

    if (usuario && (await bcrypt.compare(password, usuario.password))) {
      const payload = { username: usuario.username, sub: usuario.id, rol: usuario.rol, profesorId: usuario.profesor?.id };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken, message: 'El usuario ha logrado acceder' };
    } else {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
  }
}