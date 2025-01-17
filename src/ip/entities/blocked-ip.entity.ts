import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BlockedIp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @Column()
  blockedAt: Date;

  @Column({nullable: true})
  blockedUntil: Date;
}