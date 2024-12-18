import { Injectable } from '@nestjs/common';
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

  async findOne(profesorId: number): Promise<Idioma[]> {
    return await this.idiomaRepository.find({ where: { profesor: { id: profesorId } }, relations: ['profesor'] });
  }

  async update(profesorId: number, updateIdiomaDto: UpdateIdiomaDto): Promise<Idioma> {
    const idioma = await this.idiomaRepository.findOne({ where: { profesor: { id: profesorId } } });
    Object.assign(idioma, updateIdiomaDto);
    return await this.idiomaRepository.save(idioma);
  }

  remove(id: number) {
    return `This action removes a #${id} idioma`;
  }
}
