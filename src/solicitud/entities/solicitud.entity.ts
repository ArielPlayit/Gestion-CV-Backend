import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Solicitud {
    @PrimaryGeneratedColumn() id: number;

    @ManyToOne(() => Usuario, usuario => usuario.solicitudes)
    usuario: Usuario;

    @Column()rolSolicitado: string;

    @Column({ default: 'Pendiente'}) estado: string
}
