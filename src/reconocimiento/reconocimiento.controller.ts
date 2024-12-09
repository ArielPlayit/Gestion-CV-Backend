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
  findAll() {
    return this.reconocimientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reconocimientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReconocimientoDto: UpdateReconocimientoDto) {
    return this.reconocimientoService.update(+id, updateReconocimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reconocimientoService.remove(+id);
  }
}
