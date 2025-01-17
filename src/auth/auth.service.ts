import { ConflictException, Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto/create-auth.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
import { SecurityService} from 'src/ip/security.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
    private readonly securityService: SecurityService,
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

  async login(loginDto: LoginDto, request: any): Promise<{ accessToken: string, message: string }> {
    const { username, password } = loginDto;

    // Verificar si la IP está bloqueada
    const ip = request.ip; // Obtén la IP del cliente
    if (await this.securityService.verificarIpBloqueada(ip)) {
      throw new UnauthorizedException('La IP está bloqueada debido a múltiples intentos fallidos');
    }

    // Verificar si el usuario está bloqueado
    if (await this.securityService.verificarUsuarioBloqueado(username)) {
      throw new UnauthorizedException('El usuario está bloqueado debido a múltiples intentos fallidos');
    }

    const usuario = await this.usuarioService.findByUsername(username);
    if (!usuario) {
      await this.securityService.registrarIntentoFallido(ip, username);
      throw new UnauthorizedException('Credenciales incorrectas');
    }
  
    const isPasswordValid = await bcrypt.compare(password, usuario.password);
    if (!isPasswordValid) {
      await this.securityService.registrarIntentoFallido(ip, username);
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // // Limpiar intentos fallidos después de un inicio de sesión exitoso
    // await this.securityService.limpiarIntentosFallidos(ip);
  
    const payload = { username: usuario.username, sub: usuario.id, rol: usuario.rol, profesorId: usuario.profesor?.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, message: 'El usuario ha logrado acceder' };
  }
}