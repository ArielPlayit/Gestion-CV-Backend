import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsOptional, IsPositive, IsString, Length, Matches, MinLength } from "class-validator";
import { CategoriaCientifica, CategoriaDocente, GradoCientifico } from "../entities/profesor.entity";

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
    graduado_de: string;

    @IsOptional()
    @Type(()=> Date)
    @IsDate()
    graduado_fecha: Date;

    @IsOptional()
    @IsString()
    graduado_lugar: string;

    @IsOptional()
    @IsString()
    posicion_actual: string

    @IsOptional()
    @IsEnum(GradoCientifico)
    grado_cientifico: string;

    @IsOptional()
    @Type(()=> Date)
    @IsDate()
    fecha_de_grado_cientifico: Date;

    @IsOptional()
    @IsString()
    lugar_de_grado_cientifico: string;

    @IsOptional()
    @IsEnum(CategoriaDocente)
    categoria_docente: string;

    @IsOptional()
    @Type(()=> Date)
    @IsDate()
    fecha_de_categoria_docente: Date;

    @IsOptional()
    @IsString()
    lugar_de_categoria_docente: string;

    @IsOptional()
    @IsEnum(CategoriaCientifica)
    categoria_cientifica: string;

}
