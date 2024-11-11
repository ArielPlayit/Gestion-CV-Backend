import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReconocimientoService } from './reconocimiento.service';
import { CreateReconocimientoDto } from './dto/create-reconocimiento.dto';
import { UpdateReconocimientoDto } from './dto/update-reconocimiento.dto';

@Controller('reconocimiento')
export class ReconocimientoController {
  constructor(private readonly reconocimientoService: ReconocimientoService) {}

  @Post()
  create(@Body() createReconocimientoDto: CreateReconocimientoDto) {
    return this.reconocimientoService.create(createReconocimientoDto);
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
