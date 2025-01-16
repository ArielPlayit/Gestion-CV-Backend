import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('publicacion')
@UseGuards(JwtAuthGuard)
export class PublicacionController {
  constructor(private readonly publicacionService: PublicacionService) {}

  @Post()
  async create(@Body() createPublicacionDto: CreatePublicacionDto, @Req() req: any) {
    const profesorId = req.user.profesorId;
    return await this.publicacionService.create(createPublicacionDto, profesorId);
  }

  @Get()
  async findOne(@Req() req: any) {
    const profesorId =  req.user.profesorId;
    return await this.publicacionService.findOne(profesorId);
  }

  @Patch()
  update(@Body() updatePublicacionDto: UpdatePublicacionDto, @Req() req: any) {
    const profesorId  =  req.user.profesorId;
    return this.publicacionService.update(profesorId, updatePublicacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicacionService.remove(+id);
  }
}
