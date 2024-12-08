import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudService } from './solicitud.service';
import { SolicitudController } from './solicitud.controller';
import { Solicitud } from './entities/solicitud.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Solicitud, Usuario])],
  controllers: [SolicitudController],
  providers: [SolicitudService],
})
export class SolicitudModule {}
