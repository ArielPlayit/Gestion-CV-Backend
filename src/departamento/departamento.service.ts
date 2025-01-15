import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
    const profesor = await this.profesorRepository.findOne({ where: { id: profesorId }, relations: ['departamento'] });
    if (!profesor){
      throw new NotFoundException('Profesor no encontrado');
    }
    if (profesor.departamento) {
      throw new BadRequestException('El profesor ya está asociado a un departamento');
    }
    const departamento = await this.departamentoRepository.findOne({ where: { nombre: createDepartamentoDto.nombre }, relations: ['profesores'] });
    if (!departamento) {
      throw new NotFoundException('Departamento no encontrado');
    }
    if (departamento.profesores.some(p => p.id === profesorId)) {
      throw new BadRequestException('El profesor ya está registrado en este departamento');
    }
    profesor.departamento = departamento;
    await this.profesorRepository.save(profesor);
    return departamento;
  }

  async findOne(profesorId: number): Promise<Departamento> {
    const profesor = await this.profesorRepository.findOne({ where: { id: profesorId }, relations: ['departamento'] });
    if (!profesor) {
      throw new NotFoundException('Profesor no encontrado');
    }
    if (!profesor.departamento) {
      throw new NotFoundException('El profesor no está asociado a ningún departamento');
    }
    const departamento = await this.departamentoRepository.findOne({ where: { id: profesor.departamento.id }, relations: ['profesores'] });
    return departamento;
  }

  async update(profesorId: number, updateDepartamentoDto: UpdateDepartamentoDto): Promise<Departamento> {
    const profesor = await this.profesorRepository.findOne({ where: { id: profesorId }, relations: ['departamento'] });
    if (!profesor) {
      throw new NotFoundException('Profesor no encontrado');
    }

    const nuevoDepartamento = await this.departamentoRepository.findOne({ where: { nombre: updateDepartamentoDto.nombre }, relations: ['profesores'] });
    if (!nuevoDepartamento) {
      throw new NotFoundException('Departamento no encontrado');
    }

    if (nuevoDepartamento.profesores.some(p => p.id === profesorId)) {
      throw new BadRequestException('El profesor ya está registrado en este departamento');
    }

    profesor.departamento = nuevoDepartamento;
    await this.profesorRepository.save(profesor);
    return nuevoDepartamento;
  }

  remove(id: number) {
    return `This action removes a #${id} departamento`;
  }
}
