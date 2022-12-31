import { createUserService } from "../../services/users/createUser.service";
import { IUser } from "../../interfaces/user.interface";
import { Request, Response } from "express";

const createUserController = async (req: Request, res: Response) => {
  const user: IUser = req.body;

  const newUser = await createUserService(user);

  return res.status(201).json(newUser);
};

export { createUserController };
