import { PartialType } from '@nestjs/mapped-types';
import { CreateIdiomaDto } from './create-idioma.dto';

export class UpdateIdiomaDto extends PartialType(CreateIdiomaDto) {}
