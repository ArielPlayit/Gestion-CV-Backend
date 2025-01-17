import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Idioma {
    @PrimaryGeneratedColumn()id: number;

    @Column({
        type: 'enum',
        enum: ['Espanol','Ingles'],
        default: 'Espanol'
    })idioma: string;

    @Column({ type: 'boolean'}) lee: boolean;
    @Column({ type: 'boolean'}) traduce: boolean;
    @Column({ type: 'boolean'}) escribe: boolean;
    @Column({ type: 'boolean'}) habla: boolean;

    @ManyToOne(() => Profesor, profesor => profesor.idioma, { onDelete: 'CASCADE'})
    @JoinColumn()profesor: Profesor;



}
 