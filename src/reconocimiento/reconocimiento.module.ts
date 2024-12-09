import { Module } from '@nestjs/common';
import { ReconocimientoService } from './reconocimiento.service';
import { ReconocimientoController } from './reconocimiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reconocimiento } from './entities/reconocimiento.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';


@Module({
  controllers: [ReconocimientoController],
  providers: [ReconocimientoService],
  imports: [
    TypeOrmModule.forFeature([Reconocimiento, Profesor])
  ]
})
export class ReconocimientoModule {}
