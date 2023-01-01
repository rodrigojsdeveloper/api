import { scheduleRepository } from "../../repositories/schedule.repository";
import { Schedule } from "../../entities/schedule.entity";
import { NotFoundError } from "../../helpers";

const specificScheduleService = async (
  schedule_id: number
): Promise<Schedule> => {
  const schedule = await scheduleRepository.findOneBy({ id: schedule_id });

  if (!schedule) {
    throw new NotFoundError("Schedule");
  }

  return schedule;
};

export { specificScheduleService };
