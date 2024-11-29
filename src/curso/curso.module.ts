import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { ProfesorModule } from 'src/profesor/profesor.module';

@Module({
  controllers: [CursoController],
  providers: [CursoService],
  imports: [
    TypeOrmModule.forFeature([Curso]),
    ProfesorModule,
  ]
})
export class CursoModule {}
