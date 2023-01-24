import { Property } from "./property.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

@Entity("address")
class Address {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 8 })
  zip_code: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  complement: string;

  @OneToOne(() => Property, {
    eager: true,
  })
  @JoinColumn()
  property: Property;
}

export { Address };
