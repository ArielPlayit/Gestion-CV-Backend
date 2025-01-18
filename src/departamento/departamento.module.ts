import { Module } from '@nestjs/common';
import { DepartamentoService } from './departamento.service';
import { DepartamentoController } from './departamento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departamento } from './entities/departamento.entity';
import { ProfesorService } from 'src/profesor/profesor.service';
import { ProfesorModule } from 'src/profesor/profesor.module'
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  controllers: [DepartamentoController],
  providers: [DepartamentoService],
  imports: [
    TypeOrmModule.forFeature([Departamento]),
    ProfesorModule,
    UsuarioModule
  ]
})
export class DepartamentoModule {}
