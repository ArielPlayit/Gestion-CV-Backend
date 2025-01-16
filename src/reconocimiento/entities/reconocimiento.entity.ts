import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reconocimiento {
    @PrimaryGeneratedColumn()id: number;
    @Column()nombre: string;
    @Column()lugar: string;
    @Column()fecha: Date;
     
    @ManyToOne(() => Profesor, profesor => profesor.reconocimiento, { onDelete: 'CASCADE'})
    @JoinColumn()profesor: Profesor;
}
