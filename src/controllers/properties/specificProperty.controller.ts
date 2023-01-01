import { specificPropertyService } from "../../services/properties/specificProperty.service";
import { Request, Response } from "express";

const specificPropertyController = async (req: Request, res: Response) => {
  const property_id: string = req.params.id;

  const property = await specificPropertyService(property_id);

  return res.json(property);
};

export { specificPropertyController };
