import { specificScheduleService } from "../../services/schedules/specificSchedule.service";
import { Request, Response } from "express";

const specificScheduleController = async (req: Request, res: Response) => {
  const schedule_id: string = req.params.id;

  const schedule = await specificScheduleService(Number(schedule_id));

  return res.json(schedule);
};

export { specificScheduleController };
