import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Req } from '@nestjs/common';
import { TesisService } from './tesis.service';
import { CreateTesisDto } from './dto/create-tesi.dto';
import { UpdateTesiDto } from './dto/update-tesi.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tesis')
@UseGuards(JwtAuthGuard)
export class TesisController {
  constructor(private readonly tesisService: TesisService) {}

  @Post()
   async create(@Body() createTesisDto: CreateTesisDto, @Req() req: any) {
    const profesorId = req.user.profesorId; // Obtenemos el profesorId del token
    return await this.tesisService.create(createTesisDto, profesorId);
  }
  @Get('profesor/nombre/:nombre')
  findOne(@Param('nombre') nombre: string) {
    return this.tesisService.findByProfesorName(nombre);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTesiDto: UpdateTesiDto) {
    return this.tesisService.update(+id, updateTesiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tesisService.remove(+id);
  }
}
