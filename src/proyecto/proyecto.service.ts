import { Injectable } from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { Repository } from 'typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(Proyecto)
    private proyectoRepository: Repository<Proyecto>,
    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor>
  ) {}

  async create(createProyectoDto: CreateProyectoDto, profesorId: number): Promise<Proyecto> {
    const profesor = await this.profesorRepository.findOne({where: { id: profesorId}});
    const proyecto = this.proyectoRepository.create({
      ...createProyectoDto,
      profesor,
    });

    return await this.proyectoRepository.save(proyecto);
  }

  findAll(): Promise<Proyecto[]> {
    return this.proyectoRepository.find({ relations: ['profesor']});
  }

  async findByProfesorName(profesorName: string): Promise<Proyecto[]> {
    return await this.proyectoRepository.find({
      where: {profesor: {nombre: profesorName}},
      relations: ['profesor']
    });
  }

  async update(id: number, updateProyectoDto: UpdateProyectoDto): Promise<Proyecto> {
    const proyecto = await this.proyectoRepository.findOne({ where: {id}});
    Object.assign(proyecto, updateProyectoDto);
    return await this.proyectoRepository.save(proyecto);
  }

  remove(id: number) {
    return `This action removes a #${id} proyecto`;
  }
}
