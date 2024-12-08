import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solicitud } from './entities/solicitud.entity';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class SolicitudService {
  constructor(
    @InjectRepository(Solicitud)
    private readonly solicitudRepository: Repository<Solicitud>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) {}

  async create(createSolicitudDto: CreateSolicitudDto, usuarioId: number): Promise<Solicitud> {
    const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const solicitud = this.solicitudRepository.create({
      ...createSolicitudDto,
      usuario,
    });

    return await this.solicitudRepository.save(solicitud);
  }

  async findAll(): Promise<Solicitud[]> {
    return await this.solicitudRepository.find({ relations: ['usuario'] });
  }

  async findOne(id: number): Promise<Solicitud> {
    return await this.solicitudRepository.findOne({ where: { id }, relations: ['usuario'] });
  }

  async updateEstado(id: number, estado: string): Promise<Solicitud> {
    const solicitud = await this.findOne(id);
    solicitud.estado = estado;
    return await this.solicitudRepository.save(solicitud);
  }
}
