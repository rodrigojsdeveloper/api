import { deleteScheduleService } from "../../services/schedules/deleteSchedule.service";
import { Request, Response } from "express";

const deleteScheduleController = async (req: Request, res: Response) => {
  const schedule_id: string = req.params.id;

  await deleteScheduleService(Number(schedule_id));

  return res.status(204).json();
};

export { deleteScheduleController };
