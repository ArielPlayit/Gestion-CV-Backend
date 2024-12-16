import { IsBoolean, IsEnum, IsNotEmpty } from "class-validator";

export class CreateDepartamentoDto {
    @IsNotEmpty()
    @IsEnum(['Fisica','Informatica','Ciberseguridad'])
    nombre: string;    

}
