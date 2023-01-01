import { createPropertyService } from "../../services/properties/createProperty.service";
import { IProperty } from "../../interfaces/property.interface";
import { Request, Response } from "express";

const createPropertyController = async (req: Request, res: Response) => {
  const email: string = req.email;

  const data: IProperty = req.body;

  const newProperty = await createPropertyService(data, email);

  return res.status(201).json(newProperty);
};

export { createPropertyController };
