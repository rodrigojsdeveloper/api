import { IProperty, IPropertyUpdate } from "../interfaces/property.interface";
import { PropertiesServices } from "../services/properties.service";
import { Request, Response } from "express";

class PropertiesControllers {
  async createPropertyController(req: Request, res: Response) {
    const email: string = req.email;

    const data: IProperty = req.body;

    const newProperty = await new PropertiesServices().createPropertyService(
      data,
      email
    );

    return res.status(201).json(newProperty);
  }

  async listAllPropertiesController(req: Request, res: Response) {
    const properties =
      await new PropertiesServices().listAllPropertiesService();

    return res.json(properties);
  }

  async specificPropertyController(req: Request, res: Response) {
    const property_id: string = req.params.id;

    const property = await new PropertiesServices().specificPropertyService(
      property_id
    );

    return res.json(property);
  }

  async propertySaleController(req: Request, res: Response) {
    const property_id: string = req.params.id;

    const property = await new PropertiesServices().propertySaleService(
      property_id
    );

    return res.json(property);
  }

  async updatePropertyController(req: Request, res: Response) {
    const property_id: string = req.params.id;

    const data: IPropertyUpdate = req.body;

    const updatedProperty =
      await new PropertiesServices().updatePropertyService(data, property_id);

    return res.json(updatedProperty);
  }

  async deletePropertyController(req: Request, res: Response) {
    const property_id: string = req.params.id;

    await new PropertiesServices().deletePropertyService(property_id);

    return res.status(204).json();
  }
}

export { PropertiesControllers };
