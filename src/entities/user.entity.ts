import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Property } from "./property.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  is_adm: boolean;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  readonly created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Property, (property) => property.user, {
    eager: true,
  })
  properties: Array<Property>;
}

export { User };
