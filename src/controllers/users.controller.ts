import { UsersService } from "../services/users.service";
import { IUser } from "../interfaces/user.interface";
import { Request, Response } from "express";

class UsersController {
  async create(req: Request, res: Response) {
    const data: IUser = req.body;

    const newUser = await new UsersService().create(data);

    return res.status(201).json(newUser);
  }

  async list(req: Request, res: Response) {
    const users = await new UsersService().list();

    return res.json(users);
  }

  async listProperties(req: Request, res: Response) {
    const user_id: string = req.params.id;

    const listProperties = await new UsersService().listProperties(user_id);

    return res.json(listProperties);
  }

  async deactivate(req: Request, res: Response) {
    const user_id: string = req.params.id;

    await new UsersService().deactivate(user_id);

    return res.status(204).json();
  }

  async activate(req: Request, res: Response) {
    const user_id: string = req.params.id;

    await new UsersService().activate(user_id);

    return res.status(204).json();
  }
}

export { UsersController };
