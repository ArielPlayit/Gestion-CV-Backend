import { IsNotEmpty, IsString, Matches } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    username: string;
  
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/, { message: 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra, un número y un carácter especial' })
    password: string;
  
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/, { message: 'La confirmación de la contraseña debe tener al menos 8 caracteres, incluyendo una letra, un número y un carácter especial' })
    confirmPassword: string;
  
    rol?: string;
}

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/, { message: 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra, un número y un carácter especial' })
    password: string;
}
