import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { Repository } from 'typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>,
    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor>
  ){}


  async create(createCursoDto: CreateCursoDto, profesorId: number): Promise<Curso> {
    const profesor = await this.profesorRepository.findOne({where: { id: profesorId}})
    if(!profesor){
      throw new Error('Profesor no encontrado')
    }
    const curso = this.cursoRepository.create({
      ...createCursoDto,
      profesor,
    });
    return await this.cursoRepository.save(curso);
  }

  async findAll(profesorId: number): Promise<Curso[]> {
    return await this.cursoRepository.find({ where: { profesor: { id: profesorId } }, relations: ['profesor'] });
  }

  async update(id: number, profesorId: number, updateCursoDto: UpdateCursoDto): Promise<Curso> {
    const curso = await this.cursoRepository.findOne({ where: {id}, relations: ['profesor']});
    if (!curso) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }

    // Verificar si el profesor que intenta actualizar es el propietario del curso
    if (curso.profesor.id !== profesorId) {
      throw new ForbiddenException('No tienes permiso para actualizar este curso.');
    }
    Object.assign(curso, updateCursoDto);
    return await this.cursoRepository.save(curso);
  }

  async remove(id: number, profesorId: number): Promise<{message: string}> {
    const curso = await this.cursoRepository.findOne({ where: {id}, relations: ['profesor']});
    if (!curso) {
      throw new NotFoundException(`Curso con Id ${id} no encontrado`)
    }
    if (curso.profesor.id !== profesorId) {
      throw new ForbiddenException('No tienes permisos para eliminar este curso')
    }
    await this.cursoRepository.remove(curso);
    return {message: `Curso con ID ${id} eliminado`};
  }
}
