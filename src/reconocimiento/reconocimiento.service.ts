import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReconocimientoDto } from './dto/create-reconocimiento.dto';
import { UpdateReconocimientoDto } from './dto/update-reconocimiento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reconocimiento } from './entities/reconocimiento.entity';
import { Repository } from 'typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Injectable()
export class ReconocimientoService {
  constructor(
    @InjectRepository(Reconocimiento)
    private reconocimientoRepository: Repository<Reconocimiento>,
    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor>
  ){}
  async create(createReconocimientoDto: CreateReconocimientoDto, profesorId: number): Promise<Reconocimiento> {
    const profesor = await this.profesorRepository.findOne({where: { id: profesorId}});
    const reconocimiento = this.reconocimientoRepository.create({
      ...createReconocimientoDto,
      profesor,
    });

    return await this.reconocimientoRepository.save(reconocimiento);
  }

  async findOne(profesorId: number): Promise<Reconocimiento[]> {
    return await this.reconocimientoRepository.find({ where: { profesor: { id: profesorId } }, relations: ['profesor'] });
  }

  async update(id: number, profesorId: number, updatereconocimientoDto: UpdateReconocimientoDto): Promise<Reconocimiento> {
    const reconocimiento = await this.reconocimientoRepository.findOne({ where: {id}, relations: ['profesor']});
    if (!reconocimiento) {
      throw new NotFoundException(`reconocimiento con ID ${id} no encontrado`);
    }

    // Verificar si el profesor que intenta actualizar es el propietario del curso
    if (reconocimiento.profesor.id !== profesorId) {
      throw new ForbiddenException('No tienes permiso para actualizar este reconocimiento.');
    }
    Object.assign(reconocimiento, updatereconocimientoDto);
    return await this.reconocimientoRepository.save(reconocimiento);
  }

  async remove(id: number, profesorId: number): Promise<{message: string}> {
    const reconocimiento = await this.reconocimientoRepository.findOne({ where: {id}, relations: ['profesor']});
    if (!reconocimiento) {
      throw new NotFoundException(`reconocimiento con Id ${id} no encontrado`)
    }
    if (reconocimiento.profesor.id !== profesorId) {
      throw new ForbiddenException('No tienes permisos para eliminar este reconocimiento')
    }
    await this.reconocimientoRepository.remove(reconocimiento);
    return {message: `reconocimiento con ID ${id} eliminado`};
  }
}
