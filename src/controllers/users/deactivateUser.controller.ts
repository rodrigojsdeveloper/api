import { deactivateUserService } from "../../services/users/deactivateUser.service";
import { Request, Response } from "express";

const deactivateUserController = async (req: Request, res: Response) => {
  const user_id: string = req.params.id;

  await deactivateUserService(user_id);

  return res.status(204).json();
};

export { deactivateUserController };
