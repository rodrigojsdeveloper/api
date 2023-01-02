import { UsersServices } from "../services/users.service";
import { IUser } from "../interfaces/user.interface";
import { Request, Response } from "express";

class UsersControllers {
  async create(req: Request, res: Response) {
    const data: IUser = req.body;

    const newUser = await new UsersServices().create(data);

    return res.status(201).json(newUser);
  }

  async listProperties(req: Request, res: Response) {
    const user_id: string = req.params.id;

    const listProperties = await new UsersServices().listProperties(user_id);

    return res.json(listProperties);
  }

  async deactivate(req: Request, res: Response) {
    const user_id: string = req.params.id;

    await new UsersServices().deactivate(user_id);

    return res.status(204).json();
  }
}

export { UsersControllers };
