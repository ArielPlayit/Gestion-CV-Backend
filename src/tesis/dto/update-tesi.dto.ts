import { PartialType } from '@nestjs/mapped-types';
import { CreateTesiDto } from './create-tesi.dto';

export class UpdateTesiDto extends PartialType(CreateTesiDto) {}
