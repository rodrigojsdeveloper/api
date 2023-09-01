import { userRepository } from "../repositories/user.repository";
import { NextFunction, Request, Response } from "express";

const isActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email: string = req.email;

  const user = await userRepository.findOneBy({ email });

  if (!user?.is_active) {
    return res
      .status(403)
      .json({ message: "Unable to deactivate a deactivated user" });
  }

  next();
};

export { isActiveMiddleware };
