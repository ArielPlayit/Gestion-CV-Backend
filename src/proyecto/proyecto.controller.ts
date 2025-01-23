import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('proyecto')
@UseGuards(JwtAuthGuard)
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post()
  create(@Body() createProyectoDto: CreateProyectoDto, @Req() req: any) {
    const profesorId = req.user.profesorId;
    return this.proyectoService.create(createProyectoDto, profesorId)
  }

  @Get()
  async findAll(@Req() req: any) {
    const profesorId = req.user.profesorId;
    return await this.proyectoService.findAll(profesorId);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProyectoDto: UpdateProyectoDto, @Req() req: any) {
    const profesorId =  req.user.profesorId;
    return this.proyectoService.update( +id, profesorId, updateProyectoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    const profesorId =  req.user.profesorId;
    return this.proyectoService.remove(+id, profesorId);
  }
}
