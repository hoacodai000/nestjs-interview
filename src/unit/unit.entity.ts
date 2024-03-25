import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique } from 'typeorm';

@Entity()
@Unique(['unit_code'])
export class Unit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  unit_code: string;

  @Column()
  name: string;

  @CreateDateColumn({
    default: `now()`,
    nullable: true,
  })
  created_date: Date;
}
