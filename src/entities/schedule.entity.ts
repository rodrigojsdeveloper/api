import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinTable,
} from "typeorm";
import { User } from "./user.entity";

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

  @ManyToOne(() => User, {
    lazy: true,
  })
  @JoinTable()
  user: User;
}

export { Schedule };
