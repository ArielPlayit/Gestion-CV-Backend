import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum Rol{
    Lider = 'Lider',
    Administrador_de_DB = 'Administrador de DB',
    Desarrollador_Frontend = 'Desarrollador Frontend',
    Desarrollador_Backend = 'Desarrollador Backend'
}

@Entity()
export class Proyecto {
    @PrimaryGeneratedColumn()id: number;
    @Column()nombre: string;
    @Column()descripcion: string;
    @Column({type: 'enum',enum: Rol})rol: string;
    @Column()fechaInicio: Date;
    @Column()fechaFin: Date;

    @ManyToOne(() => Profesor, profesor => profesor.proyecto)
    @JoinColumn() profesor: Profesor;





}
