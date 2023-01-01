import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinTable,
} from "typeorm";
import { Property } from "./property.entity";

@Entity("schedules")
class Schedule {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column()
  date: string;

  @Column()
  hour: string;

  @CreateDateColumn()
  readonly created_at: Date;

  @ManyToOne(() => Property, {
    lazy: true,
  })
  @JoinTable()
  property: Property;
}

export { Schedule };
