import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { SolicitudService } from './solicitud.service';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('solicitud')
@UseGuards(JwtAuthGuard)
export class SolicitudController {
  constructor(private readonly solicitudService: SolicitudService) {}

  @Post()
  create(@Body() createSolicitudDto: CreateSolicitudDto, @Req() req: any) {
    const usuarioId = req.user.userId;
    return this.solicitudService.create(createSolicitudDto, usuarioId);
  }

  @Get()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  findAll() {
    return this.solicitudService.findAll();
  }

  @Patch(':id/estado')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  updateEstado(@Param('id') id: number, @Body('estado') estado: string) {
    return this.solicitudService.updateEstado(id, estado);
  }

}
