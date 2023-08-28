import { propertyRepository } from "../repositories/property.repository";
import { addressRepository } from "../repositories/address.repository";
import { userRepository } from "../repositories/user.repository";
import { IProperty } from "../interfaces/property.interface";
import { NotFoundError } from "../errors/notFound.error";
import { Property } from "../entities/property.entity";

class PropertiesServices {
  async create(property: IProperty, email: string): Promise<Property> {
    const newAddress = addressRepository.create(property.address);
    await addressRepository.save(newAddress);

    const user = await userRepository.findOneBy({ email });

    const newProperty = new Property();
    newProperty.value = property.value;
    newProperty.size = property.size;
    newProperty.user = user!;
    newProperty.address = newAddress;
    newProperty.schedules = [];

    propertyRepository.create(newProperty);
    await propertyRepository.save(newProperty);

    return newProperty;
  }

  async list(): Promise<Array<Property>> {
    const properties = await propertyRepository.find({
      relations: ["schedules", "user"],
    });

    return properties;
  }

  async specific(property_id: string): Promise<Property> {
    const property = await propertyRepository.findOne({
      where: { id: property_id },
      relations: ["schedules", "user"],
    });

    if (!property) {
      throw new NotFoundError("Property");
    }

    return property;
  }

  async sale(property_id: string): Promise<{ message: string }> {
    const property = await propertyRepository.findOneBy({ id: property_id });

    if (!property) {
      throw new NotFoundError("Property");
    }

    property.sold = true;

    return { message: "Property sold" };
  }

  async update(
    property: Partial<IProperty>,
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
      address: property.address ? property.address : findProperty.address,
    });

    const updatedProperty = await propertyRepository.findOne({
      where: { id: property_id },
      relations: ["schedules"],
    });

    return updatedProperty!;
  }

  async delete(property_id: string): Promise<void> {
    const property = await propertyRepository.findOneBy({ id: property_id });

    if (!property) {
      throw new NotFoundError("Property");
    }

    propertyRepository.delete(property.id);
  }
}

export { PropertiesServices };
