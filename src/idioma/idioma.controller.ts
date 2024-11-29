import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { IdiomaService } from './idioma.service';
import { CreateIdiomaDto } from './dto/create-idioma.dto';
import { UpdateIdiomaDto } from './dto/update-idioma.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('idioma')
@UseGuards(JwtAuthGuard)
export class IdiomaController {
  constructor(private readonly idiomaService: IdiomaService) {}

  @Post()
  async create(@Body() createIdiomaDto: CreateIdiomaDto, @Req() req: any) {
    const profesorId = req.user.profesorId;
    return await this.idiomaService.create(createIdiomaDto, profesorId);
  }

  @Get()
  findAll() {
    return this.idiomaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.idiomaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIdiomaDto: UpdateIdiomaDto) {
    return this.idiomaService.update(+id, updateIdiomaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.idiomaService.remove(+id);
  }
}
