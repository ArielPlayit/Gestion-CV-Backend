import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ReconocimientoService } from './reconocimiento.service';
import { CreateReconocimientoDto } from './dto/create-reconocimiento.dto';
import { UpdateReconocimientoDto } from './dto/update-reconocimiento.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('reconocimiento')
@UseGuards(JwtAuthGuard)
export class ReconocimientoController {
  constructor(private readonly reconocimientoService: ReconocimientoService) {}

  @Post()
  create(@Body() createReconocimientoDto: CreateReconocimientoDto, @Req() req: any) {
    const profesorId = req.user.profesorId;
    return this.reconocimientoService.create(createReconocimientoDto, profesorId);
  }

  @Get()
  async findOne(@Req() req: any) {
    const profesorId = req.user.profesorId
    return await this.reconocimientoService.findOne(profesorId);
  }

  @Patch()
  update(@Body() updateReconocimientoDto: UpdateReconocimientoDto, @Req() req: any) {
    const profesorId = req.user.profesorId
    return this.reconocimientoService.update(profesorId, updateReconocimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reconocimientoService.remove(+id);
  }
}
