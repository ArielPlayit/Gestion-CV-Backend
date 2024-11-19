import { Module } from '@nestjs/common';
import { TesisService } from './tesis.service';
import { TesisController } from './tesis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tesis } from './entities/tesis.entity';
import { ProfesorModule } from 'src/profesor/profesor.module';

@Module({
  controllers: [TesisController],
  providers: [TesisService],
  imports: [
    TypeOrmModule.forFeature([Tesis]),
    ProfesorModule
  ]
})
export class TesisModule {}
