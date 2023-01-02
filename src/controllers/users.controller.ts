import { UsersServices } from "../services/users.service";
import { IUser } from "../interfaces/user.interface";
import { Request, Response } from "express";

class UsersControllers {
  async createUserController(req: Request, res: Response) {
    const data: IUser = req.body;

    const newUser = await new UsersServices().createUserService(data);

    return res.status(201).json(newUser);
  }

  async listUserPropertiesController(req: Request, res: Response) {
    const user_id: string = req.params.id;

    const listProperties = await new UsersServices().allUserPropertiesService(
      user_id
    );

    return res.json(listProperties);
  }

  async deactivateUserController(req: Request, res: Response) {
    const user_id: string = req.params.id;

    await new UsersServices().deactivateUserService(user_id);

    return res.status(204).json();
  }
}

export { UsersControllers };
