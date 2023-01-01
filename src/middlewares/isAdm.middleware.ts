import { userRepository } from "../repositories/user.repository";
import { NextFunction, Request, Response } from "express";

const isAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email: string = req.email;

  const user = await userRepository.findOneBy({ email });

  if (!user?.is_adm) {
    return res
      .status(403)
      .json({ message: "only admins can access this route" });
  }

  next();
};

export { isAdmMiddleware };
