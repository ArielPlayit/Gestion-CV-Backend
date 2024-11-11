import { Module } from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { PublicacionController } from './publicacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publicacion } from './entities/publicacion.entity';

@Module({
  controllers: [PublicacionController],
  providers: [PublicacionService],
  imports: [
    TypeOrmModule.forFeature([Publicacion])
  ]
})
export class PublicacionModule {}
