import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';

@Module({
  controllers: [CursoController],
  providers: [CursoService],
  imports: [
    TypeOrmModule.forFeature([Curso]),
  ]
})
export class CursoModule {}
