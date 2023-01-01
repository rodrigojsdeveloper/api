import { propertyRepository } from "../../repositories/property.repository";
import { IPropertyUpdate } from "../../interfaces/property.interface";
import { Property } from "../../entities/property.entity";
import { NotFoundError } from "../../helpers";

const updatePropertyService = async (
  property: IPropertyUpdate,
  property_id: string
): Promise<Property> => {
  const findProperty = await propertyRepository.findOneBy({ id: property_id });

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
};

export { updatePropertyService };
