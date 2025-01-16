import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';

export enum EstadoSolicitud {
  Pendiente = 'Pendiente',
  Aprobada = 'Aprobada',
  Rechazada = 'Rechazada',
}

@Entity()
export class SolicitudJefeDepartamento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profesor, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  profesor: Profesor;

  @Column({ type: 'enum', enum: EstadoSolicitud, default: EstadoSolicitud.Pendiente })
  estado: EstadoSolicitud;

  @Column('text', { nullable: true })
  comentarios: string; // Comentarios del administrador
}
