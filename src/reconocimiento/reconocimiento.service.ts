import { Injectable } from '@nestjs/common';
import { CreateReconocimientoDto } from './dto/create-reconocimiento.dto';
import { UpdateReconocimientoDto } from './dto/update-reconocimiento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reconocimiento } from './entities/reconocimiento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReconocimientoService {
  constructor(
    @InjectRepository(Reconocimiento)
    private reconocimientoRepository: Repository<Reconocimiento>
  ){}
  async create(CreateReconocimientoDto: CreateReconocimientoDto) {
    const reconocimiento =  this.reconocimientoRepository.create(CreateReconocimientoDto);
    return await this.reconocimientoRepository.save(reconocimiento);
  }

  findAll() {
    return `This action returns all reconocimiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reconocimiento`;
  }

  update(id: number, updateReconocimientoDto: UpdateReconocimientoDto) {
    return `This action updates a #${id} reconocimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} reconocimiento`;
  }
}
