import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TesisService } from './tesis.service';
import { CreateTesisDto } from './dto/create-tesi.dto';
import { UpdateTesiDto } from './dto/update-tesi.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tesis')
@UseGuards(JwtAuthGuard)
export class TesisController {
  constructor(private readonly tesisService: TesisService) {}

  @Post()
  create(@Body() createTesisDto: CreateTesisDto, @Req() req: any) {
    const profesorId = req.user.profesorId; // Obtenemos el profesorId del token
    return this.tesisService.create(createTesisDto, profesorId);
  }

  @Get()
  async findOne(@Req() req: any) {
    const profesorId = req.user.profesorId;
    return await this.tesisService.findOne(profesorId);
  }

  @Patch()
  update(@Body() updateTesiDto: UpdateTesiDto, @Req() req: any) {
    const profesorId = req.user.profesorId;
    return this.tesisService.update(profesorId, updateTesiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tesisService.remove(+id);
  }
}
