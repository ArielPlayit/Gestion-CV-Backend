import { Injectable, NotFoundException, BadRequestException, OnApplicationBootstrap } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { Departamento } from './entities/departamento.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Injectable()

export class DepartamentosSeed implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
  ) {}

  // Método que se ejecuta al iniciar la aplicación
  async onApplicationBootstrap() {
    await this.seedDepartamentos();
  }

  // Prellenar la tabla de departamentos
  private async seedDepartamentos() {
    const departamentos = ['Fisica', 'Informatica', 'Ciberseguridad'];

    for (const nombre of departamentos) {
      const existe = await this.departamentoRepository.findOne({ where: { nombre } });
      if (!existe) {
        const nuevoDepartamento = this.departamentoRepository.create({ nombre });
        await this.departamentoRepository.save(nuevoDepartamento);
        console.log(`Departamento ${nombre} creado`);
      }
    }
  }
}

export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
  ) {}
  /**
   * Registrar un profesor en un departamento existente o crearlo si no existe.
   */
  async create(createDepartamentoDto: CreateDepartamentoDto, profesorId: number): Promise<Departamento> {
    // Verificar que el profesor existe
    const profesor = await this.profesorRepository.findOne({ where: { id: profesorId }, relations: ['departamento'] });
    if (!profesor) {
      throw new NotFoundException('Profesor no encontrado');
    }
  
    // Verificar que el profesor no esté ya asociado a otro departamento
    if (profesor.departamento) {
      throw new BadRequestException(`El profesor ya pertenece al departamento ${profesor.departamento.nombre}`);
    }
  
    // Buscar o crear el departamento
    let departamento = await this.departamentoRepository.findOne({
      where: { nombre: createDepartamentoDto.nombre },
      relations: ['profesores'], // Asegurar que se cargue la relación 'profesores'
    });
  
    // Si no existe el departamento, créalo
    if (!departamento) {
      departamento = this.departamentoRepository.create(createDepartamentoDto);
      departamento.profesores = []; // Inicializar la relación vacía
      await this.departamentoRepository.save(departamento);
    }
  
    // Asegurarse de que la relación profesores no sea undefined
    departamento.profesores = departamento.profesores || [];
  
    // Verificar si el profesor ya está registrado en este departamento
    if (departamento.profesores.some((p) => p.id === profesorId)) {
      throw new BadRequestException('El profesor ya está registrado en este departamento');
    }
  
    // Asociar el profesor al departamento
    profesor.departamento = departamento;
    await this.profesorRepository.save(profesor);
  
    return departamento;
  }
  
  /**
   * Obtener el departamento al que pertenece un profesor.
   */
  async findOne(profesorId: number): Promise<Departamento> {
    const profesor = await this.profesorRepository.findOne({ where: { id: profesorId }, relations: ['departamento'] });
    if (!profesor) {
      throw new NotFoundException('Profesor no encontrado');
    }

    if (!profesor.departamento) {
      throw new NotFoundException('El profesor no está asociado a ningún departamento');
    }

    const departamento = await this.departamentoRepository.findOne({
      where: { id: profesor.departamento.id },
      relations: ['profesores'],
    });

    return departamento;
  }
  /**
   * Cambiar el departamento de un profesor.
   */
  async update(profesorId: number, updateDepartamentoDto: UpdateDepartamentoDto): Promise<Departamento> {
    // Buscar al profesor
    const profesor = await this.profesorRepository.findOne({ where: { id: profesorId }, relations: ['departamento'] });
    if (!profesor) {
      throw new NotFoundException('Profesor no encontrado');
    }
  
    // Buscar el departamento por nombre
    const nuevoDepartamento = await this.departamentoRepository.findOne({
      where: { nombre: updateDepartamentoDto.nombre },
    });
  
    if (!nuevoDepartamento) {
      throw new NotFoundException(`El departamento ${updateDepartamentoDto.nombre} no fue encontrado`);
    }
  
    // Actualizar el departamento del profesor
    profesor.departamento = nuevoDepartamento;
    await this.profesorRepository.save(profesor);
  
    return nuevoDepartamento;
  }
  /**
   * Eliminar un departamento por ID.
   */
  async remove(id: number): Promise<string> {
    const departamento = await this.departamentoRepository.findOne({ where: { id }, relations: ['profesores'] });

    if (!departamento) {
      throw new NotFoundException('Departamento no encontrado');
    }

    // Verificar si hay profesores asociados al departamento
    if (departamento.profesores.length > 0) {
      throw new BadRequestException('No se puede eliminar el departamento porque tiene profesores asociados');
    }

    await this.departamentoRepository.delete(id);
    return `Departamento con ID ${id} eliminado correctamente`;
  }
}
