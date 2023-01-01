import { userSchedulesService } from "../../services/users/userSchedules.service";
import { Request, Response } from "express";

const userSchedulesController = async (req: Request, res: Response) => {
  const user_id: string = req.params.id;

  const schedules = await userSchedulesService(user_id);

  return res.json(schedules);
};

export { userSchedulesController };
