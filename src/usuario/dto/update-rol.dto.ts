import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdateRolDto {
    @IsNotEmpty()
    @IsEnum(['ADMIN', 'Profesor', 'Jefe_Departamento'])
    rol: string;
}
