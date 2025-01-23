import { IsEnum, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: 'La contrasena debe contener mayuscula, numero y caracter especial' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: 'Las contraseñas no coinciden' })
  confirmPassword?: string;

  @IsNotEmpty()
  @IsEnum(['ADMIN', 'Profesor', 'Jefe_Departamento'])
  rol: string;
}
