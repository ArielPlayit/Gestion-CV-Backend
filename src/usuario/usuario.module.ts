import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { ProfesorModule } from 'src/profesor/profesor.module';

@Module({
  imports: [
    ProfesorModule,
    TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuarioController],  // Aquí va el controlador
  providers: [UsuarioService],       // Aquí va el servicio
  exports: [UsuarioService],  
})
export class UsuarioModule {}
