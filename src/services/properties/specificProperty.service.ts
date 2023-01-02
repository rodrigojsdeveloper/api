import { propertyRepository } from "../../repositories/property.repository";
import { NotFoundError } from "../../errors/notFound.error";
import { Property } from "../../entities/property.entity";

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
