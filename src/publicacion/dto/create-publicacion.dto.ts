import { Type } from "class-transformer";
import { IsNotEmpty, IsEnum, IsString, IsDate} from "class-validator";
import { Rol } from "../entities/publicacion.entity";

export class CreatePublicacionDto {
    @IsNotEmpty()
    @IsString()
    titulo: string;

    @IsNotEmpty()
    @IsEnum(Rol)
    tipo: string;

    @IsNotEmpty()
    @IsString()
    lugar: string;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    fecha: Date;

}
