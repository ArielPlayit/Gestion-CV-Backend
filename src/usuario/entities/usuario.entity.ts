import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()id:number;

    @Column()username: string;

    @Column()password: string;

    @Column({
        type: 'enum',
        enum: ['ADMIN', 'Profesor', 'Jefe_Departamento'],
        default: 'Profesor'
    })rol: string;

    @OneToOne(() => Profesor, profesor => profesor.usuario)
    @JoinColumn()profesor: Profesor;
}
