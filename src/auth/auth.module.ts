import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { SecurityService } from 'src/ip/security.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { BlockedIp } from 'src/ip/entities/blocked-ip.entity';
import { FailedAttempt } from 'src/ip/entities/failedattempt.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsuarioModule,
    TypeOrmModule.forFeature([Usuario, BlockedIp, FailedAttempt]), // Importar el TypeOrmModule con las entidades Usuario y BlockedIp
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, SecurityService],
})
export class AuthModule {}
