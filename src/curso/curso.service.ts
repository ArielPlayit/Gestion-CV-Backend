import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all curso`;
  }

  findOne(id: number) {
    return `This action returns a #${id} curso`;
  }

  update(id: number, updateCursoDto: UpdateCursoDto) {
    return `This action updates a #${id} curso`;
  }

  remove(id: number) {
    return `This action removes a #${id} curso`;
  }
}
