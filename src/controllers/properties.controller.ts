import { PropertiesService } from "../services/properties.service";
import { IProperty } from "../interfaces/property.interface";
import { Request, Response } from "express";

class PropertiesController {
  async create(req: Request, res: Response) {
    const email: string = req.email;

    const data: IProperty = req.body;

    const newProperty = await new PropertiesService().create(data, email);

    return res.status(201).json(newProperty);
  }

  async list(req: Request, res: Response) {
    const properties = await new PropertiesService().list();

    return res.json(properties);
  }

  async specific(req: Request, res: Response) {
    const property_id: string = req.params.id;

    const property = await new PropertiesService().specific(property_id);

    return res.json(property);
  }

  async sale(req: Request, res: Response) {
    const property_id: string = req.params.id;

    const property = await new PropertiesService().sale(property_id);

    return res.json(property);
  }

  async update(req: Request, res: Response) {
    const property_id: string = req.params.id;

    const data: Partial<IProperty> = req.body;

    const updatedProperty = await new PropertiesService().update(
      data,
      property_id
    );

    return res.json(updatedProperty);
  }

  async delete(req: Request, res: Response) {
    const property_id: string = req.params.id;

    await new PropertiesService().delete(property_id);

    return res.status(204).json();
  }
}

export { PropertiesController };
