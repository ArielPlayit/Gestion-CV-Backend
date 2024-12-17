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
  async findOne(@Req() req: any) {
    const profesorId = req.user.profesorId;
    return await this.cursoService.findOne(profesorId);
  }

  @Patch()
  update(@Body() updateCursoDto: UpdateCursoDto, @Req() req: any) {
    const profesorId = req.user.profesorId;
    return this.cursoService.update(profesorId, updateCursoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursoService.remove(+id);
  }
}
