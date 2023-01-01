import { Property } from "../entities/property.entity";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";

const propertyRepository: Repository<Property> =
  AppDataSource.getRepository(Property);

export { propertyRepository };
