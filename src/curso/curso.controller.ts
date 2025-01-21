import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('curso')
@UseGuards(JwtAuthGuard)
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Post()
  async create(@Body() createCursoDto: CreateCursoDto, @Req()req: any) {
    const profesorId =  req.user.profesorId;
    return await this.cursoService.create(createCursoDto, profesorId);
  }

  @Get()
  async findAll(@Req() req: any) {
    const profesorId = req.user.profesorId;
    return await this.cursoService.findAll(profesorId);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCursoDto: UpdateCursoDto, @Req() req: any) {
    const profesorId = req.user.profesorId;
    return await this.cursoService.update(+id,profesorId, updateCursoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any) {
    const profesorId = req.user.profesorId;
    return await this.cursoService.remove(+id, profesorId);
  }
}
