import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateReconocimientoDto {
    @IsNotEmpty()
    @IsString()
    nombre: string

    @IsNotEmpty()
    @IsString()
    lugar: string

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    fecha: Date
}
