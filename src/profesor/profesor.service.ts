import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
  ) {}
  
  
  async create(createProfesorDto: CreateProfesorDto) {

    try{
      const profesor = this.profesorRepository.create(createProfesorDto);
      await this.profesorRepository.save(profesor);
    } catch (error) {
      // Handle the error appropriately
      throw new Error(`Error creating profesor: ${error.message}`);
    }
  }

  findAll(): Promise<Profesor[]> {
    return this.profesorRepository.find({relations: ['profesor']});
  }

  async findOne(id: number) {
    const profesor = await this.profesorRepository.findOneBy({id});
    if( !profesor)
      throw new NotFoundException(`No existe profesor con el ${id}`)
    return profesor;
  }

  async updateByUsuarioId(usuarioId: number, updateProfesorDto: UpdateProfesorDto): Promise<Profesor>{
    const profesor = await this.profesorRepository.findOne({
      where: { usuario: { id: usuarioId}}
    })
    Object.assign(profesor, updateProfesorDto)
    return await this.profesorRepository.save(profesor)
  }

  remove(id: number) {
    return `This action removes a #${id} profesor`;
  }
}
