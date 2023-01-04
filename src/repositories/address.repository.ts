import { Address } from "../entities/address.entity";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";

const addressRepository: Repository<Address> =
  AppDataSource.getRepository(Address);

export { addressRepository };
