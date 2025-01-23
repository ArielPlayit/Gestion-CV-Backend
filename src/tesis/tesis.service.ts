import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTesisDto } from './dto/create-tesi.dto';
import { UpdateTesiDto } from './dto/update-tesi.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tesis } from './entities/tesis.entity';
import { Repository } from 'typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Injectable()
export class TesisService {
  constructor( 
    @InjectRepository(Tesis)
    private tesisRepository: Repository<Tesis>,
    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor> 
  ){}

  async create(createTesiDto: CreateTesisDto, profesorId: number): Promise<Tesis> {
    const profesor = await this.profesorRepository.findOne({ where: { id: profesorId } });
    if (!profesor) {
      throw new Error('Profesor no encontrado');
    }
  
    const tesis = this.tesisRepository.create({
      ...createTesiDto,
      profesor,
    });
  
    return await this.tesisRepository.save(tesis);
  }

  async findOne(profesorId: number): Promise<Tesis[]> {
    return await this.tesisRepository.find({ where: { profesor: { id: profesorId } }, relations: ['profesor'] });
  }
  
  async findByProfesorName(profesorName: string): Promise<Tesis[]> {
    return await this.tesisRepository.find({
      where: {profesor: { nombre: profesorName}},
      relations: ['profesor']
    });
  }

  async update(id: number, profesorId: number, updatetesisDto: UpdateTesiDto): Promise<Tesis> {
    const tesis = await this.tesisRepository.findOne({ where: {id}, relations: ['profesor']});
    if (!tesis) {
      throw new NotFoundException(`tesis con ID ${id} no encontrado`);
    }

    // Verificar si el profesor que intenta actualizar es el propietario del curso
    if (tesis.profesor.id !== profesorId) {
      throw new ForbiddenException('No tienes permiso para actualizar este tesis.');
    }
    Object.assign(tesis, updatetesisDto);
    return await this.tesisRepository.save(tesis);
  }

  async remove(id: number, profesorId: number): Promise<{message: string}> {
    const tesis = await this.tesisRepository.findOne({ where: {id}, relations: ['profesor']});
    if (!tesis) {
      throw new NotFoundException(`tesis con Id ${id} no encontrado`)
    }
    if (tesis.profesor.id !== profesorId) {
      throw new ForbiddenException('No tienes permisos para eliminar este tesis')
    }
    await this.tesisRepository.remove(tesis);
    return {message: `tesis con ID ${id} eliminado`};
  }
}
