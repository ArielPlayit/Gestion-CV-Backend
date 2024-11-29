import { IsBoolean } from "class-validator";
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Departamento {
    @PrimaryGeneratedColumn()id: number;
    @Column({
        type: 'enum',
        enum: ['Fisica','Informatica','Ciberseguridad']
    })nombre: string;
    
    @OneToMany(() => Profesor, profesor => profesor.departamento)
    @JoinColumn()profesor: Profesor

}
