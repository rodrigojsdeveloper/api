import { PropertiesServices } from "../services/properties.service";
import { IProperty } from "../interfaces/property.interface";
import { Request, Response } from "express";

class PropertiesControllers {
  async create(req: Request, res: Response) {
    const email: string = req.email;

    const data: IProperty = req.body;

    const newProperty = await new PropertiesServices().create(data, email);

    return res.status(201).json(newProperty);
  }

  async list(req: Request, res: Response) {
    const properties = await new PropertiesServices().list();

    return res.json(properties);
  }

  async specific(req: Request, res: Response) {
    const property_id: string = req.params.id;

    const property = await new PropertiesServices().specific(property_id);

    return res.json(property);
  }

  async sale(req: Request, res: Response) {
    const property_id: string = req.params.id;

    const property = await new PropertiesServices().sale(property_id);

    return res.json(property);
  }

  async update(req: Request, res: Response) {
    const property_id: string = req.params.id;

    const data: Partial<IProperty> = req.body;

    const updatedProperty = await new PropertiesServices().update(
      data,
      property_id
    );

    return res.json(updatedProperty);
  }

  async delete(req: Request, res: Response) {
    const property_id: string = req.params.id;

    await new PropertiesServices().delete(property_id);

    return res.status(204).json();
  }
}

export { PropertiesControllers };
