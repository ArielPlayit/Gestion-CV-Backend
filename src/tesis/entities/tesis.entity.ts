import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tesis {
    @PrimaryGeneratedColumn()id: number;
    @Column()titulo: string;
    @Column({
        type: 'enum',
        enum: ['Tesis de Grado','Maestria','Doctorados Dirigidos','Defendidos'],
        default: 'Tesis de Grado'
    })nivel:string;
    @Column()anodefensa: Date;

    @ManyToOne(() => Profesor, profesor => profesor.tesis, { onDelete: 'CASCADE'})
    @JoinColumn()profesor: Profesor;
}
