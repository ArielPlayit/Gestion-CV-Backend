import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('proyecto')
@UseGuards(JwtAuthGuard)
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post()
  create(@Body() createProyectoDto: CreateProyectoDto, @Request() req: any) {
    createProyectoDto['profesorId'] = req.user.profesorId;
    return this.proyectoService.create(createProyectoDto)
  }

  @Get('profesor/nombre/:nombre')
  findOne(@Param('nombre') nombre: string) {
    return this.proyectoService.findByProfesorName(nombre);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProyectoDto: UpdateProyectoDto) {
    return this.proyectoService.update(+id, updateProyectoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectoService.remove(+id);
  }
}
