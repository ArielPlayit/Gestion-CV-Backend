import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { RegisterDto, LoginDto } from './dto/create-auth.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ){}

  //Register
  async register(registerDto: RegisterDto): Promise<any>{
    const{username,password,rol }=registerDto;
    
    const existingUser = await this.usuarioService.findByUsername(username);
    if (existingUser){
      throw new ConflictException('El usuario ya esta registrado');
    }

    //Encripta la contrasena
    const hashedPassword = await bcrypt.hash(password, 10);
    //Crea el usuario
    const usuario = await this.usuarioService.create({
      ...registerDto,
      password: hashedPassword,
      rol: rol || 'Profesor'
    });

  return { message: 'Usuario regitrado correctamente'};
  }

  //Login

  async login(loginDto: LoginDto): Promise<{ accessToken: string, message: string }> {
    const { username, password } = loginDto;
    const usuario = await this.usuarioService.findByUsername(username);

    // Verificar si el usuario existe y la contraseña es correcta
    if (usuario && (await bcrypt.compare(password, usuario.password))) {
      const payload = { username: usuario.username, sub: usuario.id};
      const accessToken = this.jwtService.sign(payload);
      return { accessToken, message: 'El usuario a logrado acceder' };
    } else {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
  }

}

//   findAll() {
//     return `This action returns all auth`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} auth`;
//   }

//   update(id: number, updateAuthDto: UpdateAuthDto) {
//     return `This action updates a #${id} auth`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} auth`;
//   }