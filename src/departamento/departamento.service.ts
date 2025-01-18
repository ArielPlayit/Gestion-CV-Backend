import { Injectable, NotFoundException, BadRequestException, ForbiddenException, OnModuleInit } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { Departamento } from './entities/departamento.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class DepartamentoService implements OnModuleInit {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  /**
   * Inicializar los departamentos en la base de datos.
   */
  async onModuleInit() {
    const departamentos = ['Fisica', 'Ciberseguridad', 'Informatica'];

    for (const nombre of departamentos) {
      const existe = await this.departamentoRepository.findOne({ where: { nombre } });
      if (!existe) {
        const departamento = this.departamentoRepository.create({ nombre });
        await this.departamentoRepository.save(departamento);
        console.log(`Departamento creado: ${nombre}`);
      }
    }
  }

  /**
   * Registrar un profesor en un departamento.
   */
  async create(createDepartamentoDto: CreateDepartamentoDto, profesorId: number): Promise<Departamento> {
    // Verificar que el profesor existe
    const profesor = await this.profesorRepository.findOne({ where: { id: profesorId }, relations: ['departamento'] });
    if (!profesor) {
      throw new NotFoundException('Profesor no encontrado');
    }

    // Verificar que el profesor no esté ya en un departamento
    if (profesor.departamento) {
      throw new BadRequestException(`El profesor ya pertenece al departamento ${profesor.departamento.nombre}`);
    }

    // Buscar el departamento al que se desea registrar al profesor
    const departamento = await this.departamentoRepository.findOne({ where: { nombre: createDepartamentoDto.nombre } });
    if (!departamento) {
      throw new NotFoundException(`El departamento ${createDepartamentoDto.nombre} no fue encontrado`);
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

    return profesor.departamento;
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

    // Buscar el nuevo departamento
    const nuevoDepartamento = await this.departamentoRepository.findOne({
      where: { nombre: updateDepartamentoDto.nombre },
    });
    if (!nuevoDepartamento) {
      throw new NotFoundException(`El departamento ${updateDepartamentoDto.nombre} no fue encontrado`);
    }

    // Cambiar el departamento del profesor
    profesor.departamento = nuevoDepartamento;
    await this.profesorRepository.save(profesor);

    return nuevoDepartamento;
  }

  async remove(id: number): Promise<void> {
    const departamento = await this.departamentoRepository.findOne({ where: { id }, relations: ['profesores'] });

    if (!departamento) {
        throw new NotFoundException(`Departamento con ID ${id} no encontrado`);
    }

    if (departamento.profesores && departamento.profesores.length > 0) {
        throw new BadRequestException(
            `El departamento con ID ${id} no se puede eliminar porque tiene profesores asociados.`,
        );
    }

    await this.departamentoRepository.delete(id);
}

  async findAll(profesorId: number): Promise<Profesor[]> {
    const profesor = await this.profesorRepository.findOne({ where: { id: profesorId }, relations: ['departamento', 'usuario'] });
    if (!profesor) {
      throw new NotFoundException('Profesor no encontrado');
    }

    if (profesor.usuario.rol !== 'Jefe_Departamento') {
      throw new ForbiddenException('Acceso denegado. Solo el jefe de departamento puede acceder a esta información.');
    }

    const departamento = profesor.departamento;
    if (!departamento) {
      throw new NotFoundException('El profesor no está asociado a ningún departamento');
    }

    return this.profesorRepository.find({ where: { departamento: { id: departamento.id } } });
  }
}