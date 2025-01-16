import { Module } from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { PublicacionController } from './publicacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publicacion } from './entities/publicacion.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { ProfesorModule } from 'src/profesor/profesor.module';

@Module({
  controllers: [PublicacionController],
  providers: [PublicacionService],
  imports: [
    TypeOrmModule.forFeature([Publicacion]),
    ProfesorModule,
]
})
export class PublicacionModule {}
