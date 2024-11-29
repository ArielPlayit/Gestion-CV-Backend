import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateIdiomaDto {
    @IsNotEmpty()
    @IsEnum(['Espanol','Ingles'])
    idioma: string;

    @IsNotEmpty()
    @IsString()
    lee: boolean;

    @IsNotEmpty()
    @IsString()
    traduce: boolean;

    @IsNotEmpty()
    @IsString()
    escribe: boolean;

    @IsNotEmpty()
    @IsString()
    habla: boolean;
}
