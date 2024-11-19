import { Type } from "class-transformer";
import { IsDate, IsEmail, IsOptional, IsPositive, IsString, Length, Matches, MinLength } from "class-validator";


export class CreateProfesorDto {
    @IsOptional()
    @IsEmail()
    @Matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
    email: string;
    
    @IsOptional()
    @IsString()
    nombre: string;

    @IsOptional()
    @IsString()
    primer_apellido: string;

    @IsOptional()
    @IsString()
    segundo_apellido: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    fecha_nac: Date;

    @IsOptional()
    @IsString()
    @Length(10,15)
    telefono: string;

    @IsOptional()
    @IsString()
    posicion_actual: string



}
