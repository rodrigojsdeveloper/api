import { scheduleRepository } from "../../repositories/schedule.repository";
import { NotFoundError } from "../../errors/notFound.error";
import { Schedule } from "../../entities/schedule.entity";

const specificScheduleService = async (
  schedule_id: number
): Promise<Schedule> => {
  const schedule = await scheduleRepository.findOne({
    where: { id: schedule_id },
    relations: ["property"],
  });

  if (!schedule) {
    throw new NotFoundError("Schedule");
  }

  return schedule;
};

export { specificScheduleService };
