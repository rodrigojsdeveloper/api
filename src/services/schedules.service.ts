import { scheduleRepository } from "../repositories/schedule.repository";
import { propertyRepository } from "../repositories/property.repository";
import { BadRequestError } from "../errors/badRequest.error";
import { ISchedule } from "../interfaces/schedule.interface";
import { NotFoundError } from "../errors/notFound.error";
import { Schedule } from "../entities/schedule.entity";

class SchedulesServices {
  async create(schedule: ISchedule, property_id: string): Promise<Schedule> {
    const property = await propertyRepository.findOneBy({ id: property_id });

    if (!property) {
      throw new NotFoundError("Property");
    }

    const newDate = new Date(schedule.date.split("/").reverse().join("-"));
    const newHour = Number(schedule.hour.split(":")[0]);

    if (
      (await scheduleRepository.findOneBy({ date: schedule.date })) &&
      (await scheduleRepository.findOneBy({ hour: schedule.hour }))
    ) {
      throw new BadRequestError("Schedule cannot be created at the same time");
    }

    if ([8, 18].includes(newHour)) {
      throw new BadRequestError(
        "Schedule cannot be created before 8am or after 6pm"
      );
    }
    if ([5, 6].includes(newDate.getDay())) {
      throw new BadRequestError("Schedule cannot be created on weekends");
    }

    const newSchedule = new Schedule();
    newSchedule.date = schedule.date;
    newSchedule.hour = schedule.hour;
    newSchedule.property = property;

    scheduleRepository.create(newSchedule);
    await scheduleRepository.save(newSchedule);

    return newSchedule;
  }

  async specific(schedule_id: number): Promise<Schedule> {
    const schedule = await scheduleRepository.findOne({
      where: { id: schedule_id },
      relations: ["property"],
    });

    if (!schedule) {
      throw new NotFoundError("Schedule");
    }

    return schedule;
  }

  async delete(schedule_id: number): Promise<void> {
    const schedule = await scheduleRepository.findOneBy({ id: schedule_id });

    if (!schedule) {
      throw new NotFoundError("Schedule");
    }

    scheduleRepository.delete(schedule.id);
  }
}

export { SchedulesServices };
