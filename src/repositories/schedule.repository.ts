import { Schedule } from "../entities/schedule.entity";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";

const scheduleRepository: Repository<Schedule> =
  AppDataSource.getRepository(Schedule);

export { scheduleRepository };
