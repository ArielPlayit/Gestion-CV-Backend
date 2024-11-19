import { Injectable } from '@nestjs/common';
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

    //Crear y guardar el profesor asociado con el mismo ID
    const profesor = new Profesor();
    profesor.id = savedUser.id; //Heredamos el id del usuario
    profesor.usuario = savedUser;
    await this.profesorRepository.save(profesor);

    return savedUser;
  }

  async findByUsername(username: string): Promise<Usuario|undefined> {
    return await this.usuarioRepository.findOne({where: {username}});
  }
  
  findAll() {
    return `This action returns all usuario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }


  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
