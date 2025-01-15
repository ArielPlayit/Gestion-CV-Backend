import { Controller, Post, Get, Patch, Param, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { SolicitudJefeDepartamentoService } from './solicitud.service';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';

@Controller('solicitudes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SolicitudJefeDepartamentoController {
  constructor(private readonly solicitudService: SolicitudJefeDepartamentoService) {}

  @Post()
  @Roles('Profesor')
  async create(@Req() req: any, @Body() createSolicitudDto: CreateSolicitudDto) {
    const profesorId = req.user.profesorId;
    return this.solicitudService.create(profesorId, createSolicitudDto);
  }

  @Get()
  @Roles('ADMIN')
  async findAll() {
    return this.solicitudService.findAll();
  }

  @Patch(':id')
  @Roles('ADMIN')
  async update(@Param('id') id: number, @Body() updateSolicitudDto: UpdateSolicitudDto) {
    return this.solicitudService.update(id, updateSolicitudDto);
  }
}

export { SolicitudJefeDepartamentoController as SolicitudController };
