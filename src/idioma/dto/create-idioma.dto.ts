import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsBoolean} from "class-validator";
import { IdiomaEnum } from "../entities/idioma.entity";

export class CreateIdiomaDto {
    @IsNotEmpty()
    @IsEnum(IdiomaEnum)
    idioma: IdiomaEnum;

    @IsNotEmpty()
    @IsBoolean()
    @Transform(({ value }) => value === true || value === 'true' ? true : false)
    lee: boolean;

    @IsNotEmpty()
    @IsBoolean()
    @Transform(({ value }) => value === true || value === 'true' ? true : false)
    traduce: boolean;

    @IsNotEmpty()
    @IsBoolean()
    @Transform(({ value }) => value === true || value === 'true' ? true : false)
    escribe: boolean;

    @IsNotEmpty()
    @IsBoolean()
    @Transform(({ value }) => value === true || value === 'true' ? true : false)
    habla: boolean;
}
