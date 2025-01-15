import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSolicitudDto {
  @IsString()
  @IsNotEmpty()
  comentarios: string;
}
