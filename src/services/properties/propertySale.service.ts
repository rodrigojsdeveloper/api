import { propertyRepository } from "../../repositories/property.repository";
import { NotFoundError } from "../../helpers";

const propertySaleService = async (
  property_id: string
): Promise<{ message: string }> => {
  const property = await propertyRepository.findOneBy({ id: property_id });

  if (!property) {
    throw new NotFoundError("Property");
  }

  property.sold = true;

  return { message: "Property sold" };
};

export { propertySaleService };
