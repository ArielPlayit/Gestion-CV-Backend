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
    try {
      const profesor = this.profesorRepository.create(createProfesorDto);
      await this.profesorRepository.save(profesor);
    } catch (error) {
      throw new Error(`Error creating profesor: ${error.message}`);
    }
  }

  findAll(): Promise<Profesor[]> {
    return this.profesorRepository.find({ relations: ['idioma', 'curso','proyecto','publicacion','reconocimiento','tesis'] });
  }

  async findOne(id: number): Promise<Profesor> {
    const profesor = await this.profesorRepository.findOne({
      where: { id },
      relations: ['idioma', 'curso','proyecto','publicacion','reconocimiento','tesis'],
    });
    if (!profesor) {
      throw new NotFoundException(`No existe profesor con el ID ${id}`);
    }
    return profesor;
  }

  async updateByUsuarioId(usuarioId: number, updateProfesorDto: UpdateProfesorDto): Promise<Profesor> {
    const profesor = await this.profesorRepository.findOne({
      where: { usuario: { id: usuarioId } },
      relations: ['idioma', 'curso','proyecto','publicacion','reconocimiento','tesis'],
    });
    Object.assign(profesor, updateProfesorDto);
    return await this.profesorRepository.save(profesor);
  }

  remove(id: number) {
    return `This action removes a #${id} profesor`;
  }
}
