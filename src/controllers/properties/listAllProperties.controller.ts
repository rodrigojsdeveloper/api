import { listAllPropertiesService } from "../../services/properties/listAllProperties.service";
import { Request, Response } from "express";

const listAllPropertiesController = async (req: Request, res: Response) => {
  const properties = await listAllPropertiesService();

  return res.json(properties);
};

export { listAllPropertiesController };
