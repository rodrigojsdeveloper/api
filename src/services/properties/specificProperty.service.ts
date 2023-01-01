import { propertyRepository } from "../../repositories/property.repository";
import { Property } from "../../entities/property.entity";
import { NotFoundError } from "../../helpers";

const specificPropertyService = async (
  property_id: string
): Promise<Property> => {
  const property = await propertyRepository.findOne({
    where: { id: property_id },
    relations: ["schedules", "user"],
  });

  if (!property) {
    throw new NotFoundError("Property");
  }

  return property;
};

export { specificPropertyService };
