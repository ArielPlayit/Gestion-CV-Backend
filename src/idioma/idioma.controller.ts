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
  async findAll(@Req() req: any) {
    const profesorId = req.user.profesorId;
    return await this.idiomaService.findAll(profesorId);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateIdiomaDto: UpdateIdiomaDto, @Req() req: any) {
    const profesorId = req.user.profesorId;
    return this.idiomaService.update(+id, profesorId, updateIdiomaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any) {
    const profesorId = req.user.profesorId;
    return await this.idiomaService.remove(+id, profesorId);
  }
}
