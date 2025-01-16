import { CONFIGURABLE_MODULE_ID } from "@nestjs/common/module-utils/constants";
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum Rol{
    Articulo_en_Revista = 'Articulo en Revista',
    Ponencia_en_Evento = 'Ponencia en Evento',
    Libro = 'Libro',
    Monografia = 'Monografia',
    Texto_Complementario = 'Texto Complementario'
}

@Entity()
export class Publicacion {
    @PrimaryGeneratedColumn()id: number;
    @Column()titulo: string;
    @Column({type: 'enum', enum: Rol})tipo: string;
    @Column()lugar: string;
    @Column()fecha: Date;
    @ManyToOne(() => Profesor, profesor => profesor.publicacion, { onDelete: 'CASCADE'})
    @JoinColumn()profesor: Profesor;
}
