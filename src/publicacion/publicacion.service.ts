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

  findAll(): Promise<Publicacion[]> {
    return this.publicacionRepository.find({ relations: ['profesor']});
  }

  findOne(id: number) {
    return `This action returns a #${id} idioma`;
  }

  async update(id: number, updatePublicacionDto: UpdatePublicacionDto): Promise<Publicacion> {
    const publicacion =  await this.publicacionRepository.findOne({ where: {id}});
    Object.assign(publicacion, updatePublicacionDto);
    return await this.publicacionRepository.save(publicacion);
  }

  remove(id: number) {
    return `This action removes a #${id} publicacion`;
  }
}
