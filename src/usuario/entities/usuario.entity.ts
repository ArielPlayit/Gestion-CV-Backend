import { SolicitudJefeDepartamento } from "src/solicitud/entities/solicitud.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn() id: number;

    @Column() username: string;

    @Column() password: string;

    @Column({
        type: 'enum',
        enum: ['ADMIN', 'Profesor', 'Jefe_Departamento'],
        default: 'Profesor'
    }) rol: string;

    @Column({ default: false})
    isBlocked: boolean;

    @Column({ nullable: true})
    blockedUntil: Date;

    @Column({ nullable: true})
    currentSessionToken: string;

    @OneToOne(() => Profesor, profesor => profesor.usuario, { cascade: true })
    profesor: Profesor;

    @OneToMany(() => SolicitudJefeDepartamento, solicitud => solicitud.profesor.usuario)
    solicitudes: SolicitudJefeDepartamento[];
}
