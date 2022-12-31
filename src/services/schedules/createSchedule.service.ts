import { scheduleRepository } from "../../repositories/schedule.repository";
import { ISchedule } from "../../interfaces/schedule.interface";
import { Schedule } from "../../entities/schedule.entity";
import { BadRequestError } from "../../helpers";

const createScheduleService = async (
  schedule: ISchedule
): Promise<Schedule> => {
  const newDate = new Date(schedule.date.split("/").reverse().join("-"));
  const newHour = Number(schedule.hour.split(":")[0]);

  if (
    (await scheduleRepository.findOneBy({ date: schedule.date })) &&
    (await scheduleRepository.findOneBy({ hour: schedule.hour }))
  ) {
    throw new BadRequestError("Schedule cannot be created at the same time");
  }

  if (newHour < 8 || newHour > 18) {
    throw new BadRequestError("Schedule cannot be created before 8am or after 6pm");
  }
  if (newDate.getDay() == 5 || newDate.getDay() == 6) {
    throw new BadRequestError("Schedule cannot be created on weekends");
  }

  const newSchedule = new Schedule();
  newSchedule.date = schedule.date;
  newSchedule.hour = schedule.hour;

  scheduleRepository.create(newSchedule);
  await scheduleRepository.save(newSchedule);

  return newSchedule;
};

export { createScheduleService };
