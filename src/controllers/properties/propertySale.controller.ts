import { propertySaleService } from "../../services/properties/propertySale.service";
import { Request, Response } from "express";

const propertySaleController = async (req: Request, res: Response) => {
  const property_id: string = req.params.id;

  const property = await propertySaleService(property_id);

  return res.json(property);
};

export { propertySaleController };
