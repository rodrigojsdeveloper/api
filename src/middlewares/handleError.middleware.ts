import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/api.error";

const handleErrorMiddleware = async (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : "Interval server error";
  return res.status(statusCode).json({ message });
};

export { handleErrorMiddleware };
