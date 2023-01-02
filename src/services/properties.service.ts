import { IProperty, IPropertyUpdate } from "../interfaces/property.interface";
import { propertyRepository } from "../repositories/property.repository";
import { userRepository } from "../repositories/user.repository";
import { NotFoundError } from "../errors/notFound.error";
import { Property } from "../entities/property.entity";

class PropertiesServices {
  async createPropertyService(
    property: IProperty,
    email: string
  ): Promise<Property> {
    const user = await userRepository.findOneBy({ email });

    const newProperty = new Property();
    newProperty.value = property.value;
    newProperty.size = property.size;
    newProperty.user = user!;
    newProperty.schedules = [];

    propertyRepository.create(newProperty);
    await propertyRepository.save(newProperty);

    return newProperty;
  }

  async listAllPropertiesService(): Promise<Array<Property>> {
    const properties = await propertyRepository.find({
      relations: ["schedules", "user"],
    });

    return properties;
  }

  async specificPropertyService(property_id: string): Promise<Property> {
    const property = await propertyRepository.findOne({
      where: { id: property_id },
      relations: ["schedules", "user"],
    });

    if (!property) {
      throw new NotFoundError("Property");
    }

    return property;
  }

  async propertySaleService(property_id: string): Promise<{ message: string }> {
    const property = await propertyRepository.findOneBy({ id: property_id });

    if (!property) {
      throw new NotFoundError("Property");
    }

    property.sold = true;

    return { message: "Property sold" };
  }

  async updatePropertyService(
    property: IPropertyUpdate,
    property_id: string
  ): Promise<Property> {
    const findProperty = await propertyRepository.findOneBy({
      id: property_id,
    });

    if (!findProperty) {
      throw new NotFoundError("Property");
    }

    propertyRepository.update(findProperty.id, {
      value: property.value ? property.value : findProperty.value,
      size: property.size ? property.size : findProperty.size,
    });

    const updatedProperty = await propertyRepository.findOneBy({
      id: findProperty.id,
    });

    return updatedProperty!;
  }

  async deletePropertyService(property_id: string): Promise<void> {
    const property = await propertyRepository.findOneBy({ id: property_id });

    if (!property) {
      throw new NotFoundError("Property");
    }

    propertyRepository.delete(property.id);
  }
}

export { PropertiesServices };
