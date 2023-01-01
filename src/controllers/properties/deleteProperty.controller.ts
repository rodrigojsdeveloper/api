import { deletePropertyService } from "../../services/properties/deleteProperty.service";
import { Request, Response } from "express";

const deletePropertyController = async (req: Request, res: Response) => {
  const property_id: string = req.params.id;

  await deletePropertyService(property_id);

  return res.status(204).json();
};

export { deletePropertyController };
