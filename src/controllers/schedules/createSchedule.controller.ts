import { createScheduleService } from "../../services/schedules/createSchedule.service";
import { ISchedule } from "../../interfaces/schedule.interface";
import { Request, Response } from "express";

const createScheduleController = async (req: Request, res: Response) => {
  const schedule: ISchedule = req.body;

  const newSchedule = await createScheduleService(schedule);

  return res.status(201).json(newSchedule);
};

export { createScheduleController };
