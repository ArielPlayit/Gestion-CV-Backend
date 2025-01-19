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
    console.log('Cookie', req.cookies);
    const profesorId = req.user.profesorId;
    return await this.idiomaService.create(createIdiomaDto, profesorId);
  }

  @Get()
  async findOne(@Req() req: any) {
    const profesorId = req.user.profesorId;
    return await this.idiomaService.findOne(profesorId);
  }

  @Patch()
  update(@Body() updateIdiomaDto: UpdateIdiomaDto, @Req() req: any) {
    const profesorId = req.user.profesorId;
    return this.idiomaService.update(profesorId, updateIdiomaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.idiomaService.remove(+id);
  }
}
