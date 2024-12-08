import { IsEnum, IsNotEmpty } from "class-validator";

export class CreateSolicitudDto {
  @IsNotEmpty()
  @IsEnum(['Jefe_Departamento'])
  rolSolicitado: string;
}
