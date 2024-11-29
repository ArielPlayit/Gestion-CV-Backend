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

  findAll() {
    return `This action returns all idioma`;
  }

  findOne(id: number) {
    return `This action returns a #${id} idioma`;
  }

  update(id: number, updateIdiomaDto: UpdateIdiomaDto) {
    return `This action updates a #${id} idioma`;
  }

  remove(id: number) {
    return `This action removes a #${id} idioma`;
  }
}
