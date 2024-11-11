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

  async findAll() {
    return this.profesorRepository.find({});
  }

  async findOne(id: number) {
    const profesor = await this.profesorRepository.findOneBy({id});
    if( !profesor)
      throw new NotFoundException(`No existe profesor con el ${id}`)
    return profesor;
  }

  update(id: number, updateProfesorDto: UpdateProfesorDto) {
    return `This action updates a #${id} profesor`;
  }

  remove(id: number) {
    return `This action removes a #${id} profesor`;
  }
}
