import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateTesisDto {
    @IsNotEmpty()
    @IsString()
    titulo: string

    @IsNotEmpty()
    @IsEnum(['Tesis de Grado','Maestria','Doctorados Dirigidos','Defendidos'])
    nivel?: string

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    anodefensa: Date

}
