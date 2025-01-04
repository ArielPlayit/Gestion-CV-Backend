import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Response } from 'express';

@Controller('pdf')
@UseGuards(JwtAuthGuard)
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get('cv/:profesorId')
  async getCV(@Param('profesorId') profesorId: number, @Res() res: Response) {
    const buffer = await this.pdfService.generateCV(profesorId);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=cv.pdf',
      'Content-Length': buffer.length,
    });
    res.end(buffer);
  }
}