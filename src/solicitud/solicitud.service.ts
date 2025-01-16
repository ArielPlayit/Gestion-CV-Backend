import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitudJefeDepartamento, EstadoSolicitud } from './entities/solicitud.entity';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Departamento } from '../departamento/entities/departamento.entity';

@Injectable()
export class SolicitudJefeDepartamentoService {
  constructor(
    @InjectRepository(SolicitudJefeDepartamento)
    private readonly solicitudRepository: Repository<SolicitudJefeDepartamento>,
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>, // Inyectar el repositorio Usuario
  ) {}

  async create(profesorId: number, createSolicitudDto: CreateSolicitudDto) {
    const profesor = await this.profesorRepository.findOne({ where: { id: profesorId }, relations: ['usuario'] });
    if (!profesor) {
      throw new NotFoundException('Profesor no encontrado');
    }

    if (!profesor.departamento){
      throw new Error('El profesor no pertenece a ningun departamento');
    }

    const solicitud = this.solicitudRepository.create({
      profesor,
      ...createSolicitudDto,
    });

    return this.solicitudRepository.save(solicitud);
  }

  async findAll() {
    return this.solicitudRepository.find();
  }

  async update(id: number, updateSolicitudDto: UpdateSolicitudDto) {
    const solicitud = await this.solicitudRepository.findOne({
      where: { id },
      relations: ['profesor','profesor.departamento', 'profesor.usuario'],
    });

    if (!solicitud) {
      throw new NotFoundException('Solicitud no encontrada');
    }

    Object.assign(solicitud, updateSolicitudDto);

    if (updateSolicitudDto.estado === EstadoSolicitud.Aprobada) {
      if (!solicitud.profesor.usuario) {
        throw new Error('El profesor no tiene un usuario asociado');
      }

      // Cambiar el rol del usuario
      solicitud.profesor.usuario.rol = 'Jefe_Departamento';
      await this.usuarioRepository.save(solicitud.profesor.usuario); // Guarda los cambios en `Usuario`
    }

    return this.solicitudRepository.save(solicitud); // Guarda los cambios en la solicitud
  }
}

export { SolicitudJefeDepartamentoService as SolicitudService };
