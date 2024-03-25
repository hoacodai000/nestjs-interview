import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn } from 'typeorm';

@Entity()
@Unique(['location_number'])
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location_number: string;

  @Column()
  location_name: string;

  @Column()
  area: number;

  @Column()
  unit_id: number;

  @Column({ nullable: true })
  parent_id: number;

  @CreateDateColumn({
    default: `now()`,
    nullable: true,
  })
  created_date: Date;
}
