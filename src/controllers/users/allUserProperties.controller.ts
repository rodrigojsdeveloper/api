import { allUserPropertiesService } from "../../services/users/allUserProperties.service";
import { Request, Response } from "express";

const allUserPropertiesController = async (req: Request, res: Response) => {
  const user_id: string = req.params.id;

  const schedules = await allUserPropertiesService(user_id);

  return res.json(schedules);
};

export { allUserPropertiesController };
