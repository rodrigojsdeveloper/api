import { userRepository } from "../../repositories/user.repository";
import { NotFoundError } from "../../errors/notFound.error";
import { Property } from "../../entities/property.entity";

const allUserPropertiesService = async (
  user_id: string
): Promise<Array<Property>> => {
  const user = await userRepository.findOne({
    where: { id: user_id },
    relations: ["properties"],
  });

  if (!user) {
    throw new NotFoundError("User");
  }

  return user.properties;
};

export { allUserPropertiesService };
