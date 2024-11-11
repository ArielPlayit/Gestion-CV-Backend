import { Injectable } from '@nestjs/common';
import { CreateReconocimientoDto } from './dto/create-reconocimiento.dto';
import { UpdateReconocimientoDto } from './dto/update-reconocimiento.dto';

@Injectable()
export class ReconocimientoService {
  create(createReconocimientoDto: CreateReconocimientoDto) {
    return 'This action adds a new reconocimiento';
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
