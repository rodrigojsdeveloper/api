import { SchedulesService } from "../services/schedules.service";
import { ISchedule } from "../interfaces/schedule.interface";
import { Request, Response } from "express";

class SchedulesController {
  async create(req: Request, res: Response) {
    const property_id: string = req.params.id;

    const data: ISchedule = req.body;

    const newSchedule = await new SchedulesService().create(data, property_id);

    return res.status(201).json(newSchedule);
  }

  async specific(req: Request, res: Response) {
    const schedule_id: string = req.params.id;

    const schedule = await new SchedulesService().specific(Number(schedule_id));

    return res.json(schedule);
  }

  async delete(req: Request, res: Response) {
    const schedule_id: string = req.params.id;

    await new SchedulesService().delete(Number(schedule_id));

    return res.status(204).json();
  }
}

export { SchedulesController };
