import { scheduleRepository } from "../../repositories/schedule.repository";
import { NotFoundError } from "../../errors/notFound.error";

const deleteScheduleService = async (schedule_id: number): Promise<void> => {
  const schedule = await scheduleRepository.findOneBy({ id: schedule_id });

  if (!schedule) {
    throw new NotFoundError("Schedule");
  }

  scheduleRepository.delete(schedule.id);
};

export { deleteScheduleService };
