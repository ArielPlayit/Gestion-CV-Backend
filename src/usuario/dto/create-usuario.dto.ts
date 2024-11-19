import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;


  @IsNotEmpty()
  @IsEnum(['ADMIN', 'Profesor', 'Jefe_Departamento'])
  rol: string;
}
