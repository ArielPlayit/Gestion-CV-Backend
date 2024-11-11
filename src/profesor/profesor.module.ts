import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';

@Module({
  controllers: [ProfesorController],
  providers: [ProfesorService],
  imports: [
    TypeOrmModule.forFeature([Profesor])
  ]
})
export class ProfesorModule {}
