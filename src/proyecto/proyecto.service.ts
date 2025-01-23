import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(profesorId: number): Promise<Proyecto[]> {
    return await this.proyectoRepository.find({ where: { profesor: { id: profesorId } }, relations: ['profesor'] });
  }

  async findByProfesorName(profesorName: string): Promise<Proyecto[]> {
    return await this.proyectoRepository.find({
      where: {profesor: {nombre: profesorName}},
      relations: ['profesor']
    });
  }

  async update(id: number, profesorId: number, updateproyectoDto: UpdateProyectoDto): Promise<Proyecto> {
    const proyecto = await this.proyectoRepository.findOne({ where: {id}, relations: ['profesor']});
    if (!proyecto) {
      throw new NotFoundException(`proyecto con ID ${id} no encontrado`);
    }

    // Verificar si el profesor que intenta actualizar es el propietario del curso
    if (proyecto.profesor.id !== profesorId) {
      throw new ForbiddenException('No tienes permiso para actualizar este proyecto.');
    }
    Object.assign(proyecto, updateproyectoDto);
    return await this.proyectoRepository.save(proyecto);
  }

  async remove(id: number, profesorId: number): Promise<{message: string}> {
    const proyecto = await this.proyectoRepository.findOne({ where: {id}, relations: ['profesor']});
    if (!proyecto) {
      throw new NotFoundException(`proyecto con Id ${id} no encontrado`)
    }
    if (proyecto.profesor.id !== profesorId) {
      throw new ForbiddenException('No tienes permisos para eliminar este proyecto')
    }
    await this.proyectoRepository.remove(proyecto);
    return {message: `proyecto con ID ${id} eliminado`};
  }
}
