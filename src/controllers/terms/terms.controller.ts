import { Request, Response } from "express";

const termsController = (req: Request, res: Response) => {
  return res.json({ message: "Terms and Services" });
};

export { termsController };
