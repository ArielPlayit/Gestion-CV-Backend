import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publicacion } from './entities/publicacion.entity';

@Injectable()
export class PublicacionService {
  constructor(
    @InjectRepository(Publicacion)
    private readonly publicacionRepository: Repository<Publicacion>,
    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor>
  ){}

  async create(createPublicacionDto: CreatePublicacionDto, profesorId: number): Promise<Publicacion> {
    const profesor = await this.profesorRepository.findOne({where: { id: profesorId}});
    const publicacion = this.publicacionRepository.create({
      ...createPublicacionDto,
      profesor,
    });

    return await this.publicacionRepository.save(publicacion);
  }

  async findOne(profesorId: number): Promise<Publicacion[]> {
    return await this.publicacionRepository.find({ where: { profesor : { id: profesorId}}, relations: ['profesor']});
  }

  async update(id: number, profesorId: number, updatepublicacionDto: UpdatePublicacionDto): Promise<Publicacion> {
    const publicacion = await this.publicacionRepository.findOne({ where: {id}, relations: ['profesor']});
    if (!publicacion) {
      throw new NotFoundException(`publicacion con ID ${id} no encontrado`);
    }

    // Verificar si el profesor que intenta actualizar es el propietario del curso
    if (publicacion.profesor.id !== profesorId) {
      throw new ForbiddenException('No tienes permiso para actualizar este publicacion.');
    }
    Object.assign(publicacion, updatepublicacionDto);
    return await this.publicacionRepository.save(publicacion);
  }

  async remove(id: number, profesorId: number): Promise<{message: string}> {
    const publicacion = await this.publicacionRepository.findOne({ where: {id}, relations: ['profesor']});
    if (!publicacion) {
      throw new NotFoundException(`publicacion con Id ${id} no encontrado`)
    }
    if (publicacion.profesor.id !== profesorId) {
      throw new ForbiddenException('No tienes permisos para eliminar este publicacion')
    }
    await this.publicacionRepository.remove(publicacion);
    return {message: `publicacion con ID ${id} eliminado`};
  }
}
