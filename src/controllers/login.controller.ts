import { LoginService } from "../services/login.service";
import { ILogin } from "../interfaces/login.interface";
import { Request, Response } from "express";

class LoginController {
  async create(req: Request, res: Response) {
    const data: ILogin = req.body;

    const token = await new LoginService().create(data);

    return res.json(token);
  }
}

export { LoginController };
