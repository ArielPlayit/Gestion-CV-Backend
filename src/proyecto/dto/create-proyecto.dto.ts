import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProyectoDto {
    @IsNotEmpty()
    @IsString()
    nombre: string

    @IsNotEmpty()
    @IsString()
    descripcion: string

    @IsNotEmpty()
    @IsString()
    rol: string

    @IsNotEmpty()
    @Type(() => Date)
    fechaInicio: Date

    @IsNotEmpty()
    @Type(() => Date)
    fechaFin: Date 
}
