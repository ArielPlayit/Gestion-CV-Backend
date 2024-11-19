import { PartialType } from '@nestjs/mapped-types';
import { CreateTesisDto } from './create-tesi.dto';

export class UpdateTesiDto extends PartialType(CreateTesisDto) {}
