import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Rol } from "../entities/proyecto.entity";

export class CreateProyectoDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    descripcion: string;

    @IsNotEmpty()
    @IsEnum(Rol)
    rol?: string;

    @IsNotEmpty()
    @Type(() => Date)
    fechaInicio: Date;

    @IsNotEmpty()
    @Type(() => Date)
    fechaFin: Date ;
}
