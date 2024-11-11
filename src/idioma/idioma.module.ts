import { Module } from '@nestjs/common';
import { IdiomaService } from './idioma.service';
import { IdiomaController } from './idioma.controller';
import { Idioma } from './entities/idioma.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [IdiomaController],
  providers: [IdiomaService],
  imports: [
    TypeOrmModule.forFeature([Idioma]),
  ]
})
export class IdiomaModule {}
