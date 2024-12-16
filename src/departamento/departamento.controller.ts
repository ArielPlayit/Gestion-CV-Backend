import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { DepartamentoService } from './departamento.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('departamento')
@UseGuards(JwtAuthGuard)
export class DepartamentoController {
  constructor(private readonly departamentoService: DepartamentoService) {}

  @Post()
   async create(@Body() createDepartamentoDto: CreateDepartamentoDto, @Req() req: any) {
    const profesorId =  req.user.profesorId;
    return await this.departamentoService.create(createDepartamentoDto, profesorId);
  }

  @Get()
  async findOne(@Req() req: any) {
    const profesorId = req.user.profesorId;
    return await this.departamentoService.findOne(profesorId);
  }

  @Patch(':id')
  async update(@Body() updateDepartamentoDto: UpdateDepartamentoDto, @Req() req: any) {
    const profesorId = req.user.profesorId;
    return await this.departamentoService.update(profesorId, updateDepartamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departamentoService.remove(+id);
  }
}
