import { Type } from "class-transformer";
import { IsDate, IsEmail, IsPositive, IsString, Length, Matches, MinLength } from "class-validator";


export class CreateProfesorDto {
    
    @IsEmail()
    @Matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
    email: string;
    
    @IsString()
    @MinLength(8)
    contrasena:string;

    @IsString()
    nombre: string;

    @IsString()
    primer_apellido: string;

    @IsString()
    segundo_apellido: string;

    @Type(() => Date)
    @IsDate()
    fecha_nac: Date;

    @IsString()
    @Length(10,15)
    telefono: string;

    @IsString()
    posicion_actual: string



}
