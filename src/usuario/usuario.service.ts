import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>
  ){}

  async create(usuarioData: CreateUsuarioDto): Promise<Usuario> {
    const newUser = this.usuarioRepository.create(usuarioData);
    const savedUser = await this.usuarioRepository.save(newUser);

    const profesor = new Profesor();
    profesor.id = savedUser.id;
    profesor.usuario = savedUser;
    await this.profesorRepository.save(profesor);

    return savedUser;
  }

  async findByUsername(username: string): Promise<Usuario | undefined> {
    return await this.usuarioRepository.findOne({ where: { username }, relations: ['profesor'] });
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

  updateRol(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioRepository.update(id, updateUsuarioDto);
  }

  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
