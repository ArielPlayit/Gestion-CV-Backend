import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Curso {

    @PrimaryGeneratedColumn()id: number;
    @Column()nombre_del_curso: string;
    @Column()institucion: string;
    @Column({
        type: 'enum',
        enum: ['Pregrado','Postgrado'],
        default: 'Pregrado'
    })tipo: string;
    @Column()fechainicio: Date;
    @Column()fechafin: Date

    @ManyToOne(() => Profesor, profesor => profesor.curso, { onDelete: 'CASCADE'})
    @JoinTable() profesor: Profesor

}
