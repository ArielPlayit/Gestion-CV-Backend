import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UpdateRolDto } from './dto/update-rol.dto'; // Importar UpdateRolDto
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import * as bcrypt from 'bcrypt';
import { take } from 'rxjs';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>
  ){}

  async create(usuarioData: CreateUsuarioDto): Promise<Usuario> {
    const { username, password, rol } = usuarioData;

    const newUser = this.usuarioRepository.create({
      username,
      password,
      rol
    });
    const savedUser = await this.usuarioRepository.save(newUser);

    const profesor = new Profesor();
    profesor.id = savedUser.id;
    profesor.usuario = savedUser;
    await this.profesorRepository.save(profesor);

    return savedUser;
  }

  async findByUsername(username: string): Promise<Usuario | undefined> {
    return await this.usuarioRepository.findOne({ where: { username }, relations: ['profesor'] });
      take(10)
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id }, relations: ['profesor'] });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async updateUsername(id: number, newUsername: string): Promise<Usuario> {
    const usuario = await this.findOne(id);
    usuario.username = newUsername;
    await this.usuarioRepository.save(usuario);
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    if (updateUsuarioDto.password){
      updateUsuarioDto.password = await bcrypt.hash(updateUsuarioDto.password, 10);
    }
      await this.usuarioRepository.update(id, updateUsuarioDto);
      return this.findOne(id);
  }

  async updateRol(id: number, updateRolDto: UpdateRolDto): Promise<Usuario>{
    await this.usuarioRepository.update(id, updateRolDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.profesorRepository.delete({ usuario: { id}})
    await this.usuarioRepository.delete(id);
  }
}
function limit(arg0: number) {
  throw new Error('Function not implemented.');
}

