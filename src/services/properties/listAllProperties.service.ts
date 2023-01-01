import { propertyRepository } from "../../repositories/property.repository";
import { Property } from "../../entities/property.entity";

const listAllPropertiesService = async (): Promise<Array<Property>> => {
  const properties = await propertyRepository.find({
    relations: ["schedules", "user"],
  });

  return properties;
};

export { listAllPropertiesService };
