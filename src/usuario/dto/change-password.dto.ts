import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  currentPassword: string; // Contraseña actual

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/, { message: 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra, un número y un carácter especial' })
  newPassword: string; // Nueva contraseña
}
