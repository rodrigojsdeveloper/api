import { propertyRepository } from "../../repositories/property.repository";
import { userRepository } from "../../repositories/user.repository";
import { IProperty } from "../../interfaces/property.interface";
import { Property } from "../../entities/property.entity";

const createPropertyService = async (
  property: IProperty,
  email: string
): Promise<Property> => {
  const user = await userRepository.findOneBy({ email });

  const newProperty = new Property();
  newProperty.value = property.value;
  newProperty.size = property.size;
  newProperty.user = user!;
  newProperty.schedules = [];

  propertyRepository.create(newProperty);
  await propertyRepository.save(newProperty);

  return newProperty;
};

export { createPropertyService };
