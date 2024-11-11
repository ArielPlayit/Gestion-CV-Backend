import { Injectable } from '@nestjs/common';
import { CreateTesiDto } from './dto/create-tesi.dto';
import { UpdateTesiDto } from './dto/update-tesi.dto';

@Injectable()
export class TesisService {
  create(createTesiDto: CreateTesiDto) {
    return 'This action adds a new tesi';
  }

  findAll() {
    return `This action returns all tesis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tesi`;
  }

  update(id: number, updateTesiDto: UpdateTesiDto) {
    return `This action updates a #${id} tesi`;
  }

  remove(id: number) {
    return `This action removes a #${id} tesi`;
  }
}
