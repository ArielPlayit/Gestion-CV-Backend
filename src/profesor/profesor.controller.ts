import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { Profesor } from './entities/profesor.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('profesor')
@UseGuards(JwtAuthGuard)
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  create(@Body() createProfesorDto: CreateProfesorDto) {
    return this.profesorService.create(createProfesorDto);
  }

  @Get()
  findAll() {
    return this.profesorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.profesorService.findOne(+id);
  }

  @Patch()
  async update(
    @Req() req: any,
    @Body() updateProfesorDto: UpdateProfesorDto,
  ){
    const usuarioId = req.user.userId;
    return this.profesorService.updateByUsuarioId(usuarioId, updateProfesorDto)
  }
  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profesorService.remove(+id);
  }
}
