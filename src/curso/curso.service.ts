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

  async findOne(profesorId: number): Promise<Curso[]> {
    return await this.cursoRepository.find({ where: { profesor: { id: profesorId } }, relations: ['profesor'] });
  }

  async update(id: number, updateCursoDto: UpdateCursoDto): Promise<Curso> {
    const curso = await this.cursoRepository.findOne({ where: {id}});
    Object.assign(curso, updateCursoDto);
    return await this.cursoRepository.save(curso);
  }

  remove(id: number) {
    return `This action removes a #${id} curso`;
  }
}
