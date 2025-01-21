import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateIdiomaDto } from './dto/create-idioma.dto';
import { UpdateIdiomaDto } from './dto/update-idioma.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Idioma } from './entities/idioma.entity';
import { Repository } from 'typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Injectable()
export class IdiomaService {
  constructor(
    @InjectRepository(Idioma)
    private idiomaRepository: Repository<Idioma>,
    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor>
  ){}
  async create(createIdiomaDto: CreateIdiomaDto, profesorId: number): Promise<Idioma> {
    console.log(createIdiomaDto)
    const profesor = await this.profesorRepository.findOne({where: { id: profesorId}});
    if (!profesor){
      throw new Error('Profesor no encontrado');
    }
    const idioma = this.idiomaRepository.create({
      ...createIdiomaDto,
      profesor,
    });
    return await this.idiomaRepository.save(idioma);
  }

  async findAll(profesorId: number): Promise<Idioma[]> {
    return await this.idiomaRepository.find({ where: { profesor: { id: profesorId } }, relations: ['profesor'] });
  }

  async update(id: number, profesorId: number, updateIdiomaDto: UpdateIdiomaDto): Promise<Idioma> {
      const idioma = await this.idiomaRepository.findOne({ where: {id}, relations: ['profesor']});
      if (!idioma) {
        throw new NotFoundException(`Idioma con ID ${id} no encontrado`);
      }
  
      // Verificar si el profesor que intenta actualizar es el propietario del curso
      if (idioma.profesor.id !== profesorId) {
        throw new ForbiddenException('No tienes permiso para actualizar este idioma.');
      }
      Object.assign(idioma, updateIdiomaDto);
      return await this.idiomaRepository.save(idioma);
    }
  
    async remove(id: number, profesorId: number): Promise<{message: string}> {
      const idioma = await this.idiomaRepository.findOne({ where: {id}, relations: ['profesor']});
      if (!idioma) {
        throw new NotFoundException(`Idioma con Id ${id} no encontrado`)
      }
      if (idioma.profesor.id !== profesorId) {
        throw new ForbiddenException('No tienes permisos para eliminar este Idioma')
      }
      await this.idiomaRepository.remove(idioma);
      return {message: `Idioma con ID ${id} eliminado`};
    }
}
