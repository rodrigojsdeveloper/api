import { allUserSchedulesService } from "../../services/users/allUserSchedules.service";
import { Request, Response } from "express";

const allUserSchedulesController = async (req: Request, res: Response) => {
  const user_id: string = req.params.id;

  const schedules = await allUserSchedulesService(user_id);

  return res.json(schedules);
};

export { allUserSchedulesController };
