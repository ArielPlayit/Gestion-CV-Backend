import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudJefeDepartamentoService } from './solicitud.service';
import { SolicitudJefeDepartamentoController } from './solicitud.controller';
import { SolicitudJefeDepartamento } from './entities/solicitud.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ProfesorModule } from 'src/profesor/profesor.module'; // Importar el ProfesorModule

@Module({
  imports: [
    TypeOrmModule.forFeature([SolicitudJefeDepartamento, Usuario]),
    ProfesorModule, // Importar el ProfesorModule
  ],
  controllers: [SolicitudJefeDepartamentoController],
  providers: [SolicitudJefeDepartamentoService],
})
export class SolicitudModule {}
