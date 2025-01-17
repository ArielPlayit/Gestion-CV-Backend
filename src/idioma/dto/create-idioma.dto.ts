import { IsEnum, IsNotEmpty, IsBoolean } from "class-validator";

export class CreateIdiomaDto {
    @IsNotEmpty()
    @IsEnum(['Espanol','Ingles'])
    idioma: string;

    @IsNotEmpty()
    @IsBoolean()
    lee: boolean;

    @IsNotEmpty()
    @IsBoolean()
    traduce: boolean;

    @IsNotEmpty()
    @IsBoolean()
    escribe: boolean;

    @IsNotEmpty()
    @IsBoolean()
    habla: boolean;
}
