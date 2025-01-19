import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from "@nestjs/config";
import { UsuarioService } from 'src/usuario/usuario.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usuarioService: UsuarioService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        let token = null;
        if (request && request.cookies) {
          token = request.cookies['accessToken'];
        }
        return token;
      }]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const usuario = await this.usuarioService.findById(payload.sub);
    if (!usuario) {
      throw new UnauthorizedException('Sesión inválida o expirada');
    }
    console.log('Token Payload:', payload);
    // Aquí se extraen los datos del payload y se ponen en req.user
    return { userId: payload.sub, username: payload.username, profesorId: payload.profesorId, rol: payload.rol };
  }
}
