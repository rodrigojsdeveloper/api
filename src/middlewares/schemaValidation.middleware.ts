import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

const schemaValidationMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: unknown = req.body;

      const validatedData = await schema.validate(data);

      req.body = validatedData;
    } catch (error: any) {
      console.log(error);

      return res.status(400).json({ message: error.errors?.join(", ") });
    }
  };

export { schemaValidationMiddleware };
