import { ConflictException, Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto/create-auth.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
import { SecurityService } from 'src/ip/security.service';
import { Response } from 'express';
import { ChangePasswordDto } from 'src/usuario/dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
    private readonly securityService: SecurityService,
  ) {}

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
      rol: rol || 'Profesor',
    };
    const usuario = await this.usuarioService.create(usuarioData);

    return { message: 'Usuario registrado correctamente' };
  }

  async login(loginDto: LoginDto, request: any, response: Response): Promise<{ message: string }> {
    const { username, password } = loginDto;

    // Verificar si la IP está bloqueada
    const ip = request.ip; // Obtén la IP del cliente
    console.log('verificando ip', ip)
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
      console.log('El usuario',username,'ha introducido mal la contresena')
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = { username: usuario.username, sub: usuario.id, rol: usuario.rol, profesorId: usuario.profesor?.id };
    const accessToken = this.jwtService.sign(payload);
    // Guarda el token en la BD
    usuario.currentSessionToken = accessToken;
    await this.usuarioService.updateSessionToken(usuario.id, accessToken);

    // Establecer la cookie
    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Usar solo en HTTPS en producción
      maxAge: 60 * 60 * 1000, // 1 hora
      sameSite: 'strict'
    });

    return { message: 'El usuario ha logrado acceder' };
  }

  async logout(request: any, response: Response): Promise<{ message: string }> {
    // Eliminar la cookie
    response.clearCookie('accessToken');

    // Eliminar el token de la BD
    const usuario = await this.usuarioService.findById(request.user.id);
    usuario.currentSessionToken = null;
    await this.usuarioService.updateSessionToken(usuario.id, null);

    return { message: 'El usuario ha salido correctamente' };
  }

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto): Promise<{ message: string }> {
    const { currentPassword, newPassword } = changePasswordDto;

    // Obtener el usuario de la base de datos
    const usuario = await this.usuarioService.findById(userId);
    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // Verificar si la contraseña actual es correcta
    const isPasswordValid = await bcrypt.compare(currentPassword, usuario.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('La contraseña actual es incorrecta');
    }

    // Verificar que la nueva contraseña sea diferente a la actual
    const isSamePassword = await bcrypt.compare(newPassword, usuario.password);
    if (isSamePassword) {
      throw new BadRequestException('La nueva contraseña no puede ser igual a la actual');
    }

    // Encriptar la nueva contraseña y actualizarla
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    usuario.password = hashedPassword;
    await this.usuarioService.updatePassword(userId, hashedPassword);

    return { message: 'Contraseña actualizada correctamente' };
  }
}