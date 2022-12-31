import { userSchedulesService } from "../../services/users/userSchedules.service";
import { Request, Response } from "express";

const userSchedulesController = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const schedules = await userSchedulesService(id);

  return res.json(schedules);
};

export { userSchedulesController };
