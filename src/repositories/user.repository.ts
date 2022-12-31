import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";

const userRepository: Repository<User> = AppDataSource.getRepository(User);

export { userRepository };
