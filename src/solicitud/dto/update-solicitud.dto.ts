import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EstadoSolicitud } from '../entities/solicitud.entity';

export class UpdateSolicitudDto {
  @IsEnum(EstadoSolicitud)
  @IsOptional()
  estado?: EstadoSolicitud;

  @IsString()
  @IsOptional()
  comentarios?: string;
}
