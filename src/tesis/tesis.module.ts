import { Module } from '@nestjs/common';
import { TesisService } from './tesis.service';
import { TesisController } from './tesis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tesis } from './entities/tesis.entity';

@Module({
  controllers: [TesisController],
  providers: [TesisService],
  imports: [
    TypeOrmModule.forFeature([Tesis]),
  ]
})
export class TesisModule {}
