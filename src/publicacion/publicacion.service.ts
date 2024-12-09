import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all publicacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} idioma`;
  }

  update(id: number, updatePublicacionDto: UpdatePublicacionDto) {
    return `This action updates a #${id} publicacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicacion`;
  }
}
