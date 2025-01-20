import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UpdateRolDto } from './dto/update-rol.dto'; // Importar UpdateRolDto
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('usuario')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Get('buscar/:name')
  @Roles('ADMIN')
  findByName(@Param('name') name: string) {
    return this.usuarioService.findByUsername(name);
  }

  @Patch(':id/password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() req: any) {
    const userId = req.user.userId; // Obtenemos el ID del usuario desde el token JWT
    return this.authService.changePassword(userId, changePasswordDto);
  }

  @Patch(':id/rol')
  @Roles('ADMIN')
  async updateRol(@Param('id') id: number, @Body() updateRolDto: UpdateRolDto) { // Usar UpdateRolDto
    return this.usuarioService.updateRol(id, updateRolDto);
  }

  @Patch(':id/username')
  @Roles('ADMIN', 'Profesor')
  async updateUsername(@Param('id') id: number, @Body('username') newUsername: string) {
    return this.usuarioService.updateUsername(id, newUsername);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
