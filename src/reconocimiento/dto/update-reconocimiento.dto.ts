import { PartialType } from '@nestjs/mapped-types';
import { CreateReconocimientoDto } from './create-reconocimiento.dto';

export class UpdateReconocimientoDto extends PartialType(CreateReconocimientoDto) {}
