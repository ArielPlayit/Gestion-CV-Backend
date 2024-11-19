import { Injectable } from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(Proyecto)
    private proyectoRepository: Repository<Proyecto>
  ) {}
  async create(createProyectoDto: CreateProyectoDto) {
    const proyecto = this.proyectoRepository.create(createProyectoDto)
    return await this.proyectoRepository.save(proyecto);
  }

  async findByProfesorName(profesorName: string): Promise<Proyecto[]> {
    return await this.proyectoRepository.find({
      where: {profesor: {nombre: profesorName}},
      relations: ['profesor']
    });
  }

  update(id: number, updateProyectoDto: UpdateProyectoDto) {
    return `This action updates a #${id} proyecto`;
  }

  remove(id: number) {
    return `This action removes a #${id} proyecto`;
  }
}
