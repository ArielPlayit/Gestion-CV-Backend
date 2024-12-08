import { PartialType } from '@nestjs/swagger';
import { CreateSolicitudDto } from './create-solicitud.dto';

export class UpdateSolicitudDto extends PartialType(CreateSolicitudDto) {}
