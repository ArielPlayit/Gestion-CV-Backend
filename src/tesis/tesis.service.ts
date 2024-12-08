import { Injectable } from '@nestjs/common';
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

  async findByProfesorName(profesorName: string): Promise<Tesis[]> {
    return await this.tesisRepository.find({
      where: {profesor: { nombre: profesorName}},
      relations: ['profesor']
    });
  }

  update(id: number, updateTesiDto: UpdateTesiDto) {
    return `This action updates a #${id} tesi`;
  }

  remove(id: number) {
    return `This action removes a #${id} tesi`;
  }
}