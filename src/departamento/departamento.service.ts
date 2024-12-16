import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { Departamento } from './entities/departamento.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private departamentoRepository: Repository<Departamento>,
    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor>
  ){}

  async create(createDepartamentoDto: CreateDepartamentoDto, profesorId: number): Promise<Departamento> {
    const profesor = await this.profesorRepository.findOne({ where: { id: profesorId }});
    if (!profesor){
      throw new NotFoundException('Profesor no encontrado');
    }
    const departamento = this.departamentoRepository.create({
      ...createDepartamentoDto,
      profesor: [profesor], // Asignar el profesor en un array
    });

    return await this.departamentoRepository.save(departamento);
  }

  async findOne(profesorId: number): Promise<Departamento> {
    const profesor = await this.profesorRepository.findOne({ where: { id: profesorId }, relations: ['departamento'] });
    if (!profesor) {
      throw new NotFoundException('Profesor no encontrado');
    }
    if (!profesor.departamento) {
      throw new NotFoundException('El profesor no está asociado a ningún departamento');
    }
    const departamento = await this.departamentoRepository.findOne({ where: { id: profesor.departamento.id }, relations: ['profesor'] });
    return departamento;
  }

  async update(profesorId: number, updateDepartamentoDto: UpdateDepartamentoDto): Promise<Departamento> {
    const departamento = await this.departamentoRepository.findOne({ where: { id: profesorId }});
    Object.assign(departamento, updateDepartamentoDto);
    return await this.departamentoRepository.save(departamento);
  }

  remove(id: number) {
    return `This action removes a #${id} departamento`;
  }
}
