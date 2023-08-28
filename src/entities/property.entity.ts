import { Schedule } from "./schedule.entity";
import { Address } from "./address.entity";
import { User } from "./user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";

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

  @OneToMany((type) => Schedule, (schedule) => schedule.property)
  schedules: Array<Schedule>;

  @ManyToOne((type) => User, (user) => user.properties)
  user: User;

  @OneToOne((type) => Address)
  @JoinColumn()
  address: Address;
}

export { Property };
