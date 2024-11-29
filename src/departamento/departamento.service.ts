import { Injectable } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { Departamento } from './entities/departamento.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private departamentoRepository: Repository<Departamento>,
    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor>
  ){}
  async create(createDepartamentoDto: CreateDepartamentoDto, profesorId: number): Promise<Departamento> {
    const profesor = await this.profesorRepository.findOne({where: { id: profesorId}});
    if (!profesor){
      throw new Error('Profesor no encontrado');
    }
    const departamento = this.departamentoRepository.create({
      ...createDepartamentoDto,
      profesor,
    });

    return await this.departamentoRepository.save(departamento);
  }

  findAll() {
    return `This action returns all departamento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} departamento`;
  }

  update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
    return `This action updates a #${id} departamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} departamento`;
  }
}
