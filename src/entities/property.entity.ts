import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Schedule } from "./schedule.entity";
import { User } from "./user.entity";

@Entity("properties")
class Property {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  value: number;

  @Column()
  size: number;

  @Column({ default: false })
  sold: boolean;

  @CreateDateColumn()
  readonly created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Schedule, (schedule) => schedule.property, {
    eager: true,
  })
  schedules: Array<Schedule>;

  @ManyToOne(() => User, (user) => user.properties)
  @JoinColumn({ name: "user_id" })
  user: User;
}

export { Property };
