import { updatePropertyService } from "../../services/properties/updateProperty.service";
import { IPropertyUpdate } from "../../interfaces/property.interface";
import { Request, Response } from "express";

const updatePropertyController = async (req: Request, res: Response) => {
  const property_id: string = req.params.id;

  const data: IPropertyUpdate = req.body;

  const updatedProperty = await updatePropertyService(data, property_id);

  return res.json(updatedProperty);
};

export { updatePropertyController };
