import { propertyRepository } from "../../repositories/property.repository";
import { NotFoundError } from "../../helpers";

const deletePropertyService = async (property_id: string): Promise<void> => {
  const property = await propertyRepository.findOneBy({ id: property_id });

  if (!property) {
    throw new NotFoundError("Property");
  }

  propertyRepository.delete(property.id);
};

export { deletePropertyService };
