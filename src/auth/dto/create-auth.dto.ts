import { IsNotEmpty, IsString, Matches } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    username: string;
  
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra y un número' })
    password: string;
  
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: 'La confirmación de la contraseña debe tener al menos 8 caracteres, incluyendo una letra y un número' })
    confirmPassword: string;
  
    rol?: string;
}

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra y un número' })
    password: string;
}