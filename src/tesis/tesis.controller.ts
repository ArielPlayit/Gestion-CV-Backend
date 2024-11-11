import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TesisService } from './tesis.service';
import { CreateTesiDto } from './dto/create-tesi.dto';
import { UpdateTesiDto } from './dto/update-tesi.dto';

@Controller('tesis')
export class TesisController {
  constructor(private readonly tesisService: TesisService) {}

  @Post()
  create(@Body() createTesiDto: CreateTesiDto) {
    return this.tesisService.create(createTesiDto);
  }

  @Get()
  findAll() {
    return this.tesisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tesisService.findOne(+id);
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
