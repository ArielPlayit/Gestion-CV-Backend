import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateCursoDto {
    
    @IsNotEmpty()
    @IsString()
    nombre_del_curso: string;

    @IsNotEmpty()
    @IsString()
    institucion: string;

    @IsNotEmpty()
    @IsEnum(['Pregrado','Postgrado'])
    tipo?: string;

    @IsNotEmpty()
    @Type(() => Date)
    fechainicio: Date;

    @IsNotEmpty()
    @Type(() => Date)
    fechafin: Date;

}


