import { Property } from "./property.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

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

  @ManyToOne(() => Property, (property) => property.schedules)
  @JoinColumn({ name: "property_id" })
  property: Property;
}

export { Schedule };
