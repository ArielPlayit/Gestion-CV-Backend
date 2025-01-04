import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { ProfesorModule } from 'src/profesor/profesor.module';

@Module({
  imports: [ProfesorModule],
  providers: [PdfService],
  controllers: [PdfController],
})
export class PdfModule {}