import { loginService } from "../../services/login/login.service";
import { ILogin } from "../../interfaces/login.interface";
import { Request, Response } from "express";

const loginController = async (req: Request, res: Response) => {
  const data: ILogin = req.body;

  const token = await loginService(data);

  return res.json(token);
};

export { loginController };
