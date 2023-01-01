import { userRepository } from "../../repositories/user.repository";
import { Property } from "../../entities/property.entity";
import { NotFoundError } from "../../helpers";

const allUserSchedulesService = async (
  user_id: string
): Promise<Array<Property>> => {
  const user = await userRepository.findOne({
    where: { id: user_id },
    relations: ["schedules"],
  });

  if (!user) {
    throw new NotFoundError("User");
  }

  return user.properties;
};

export { allUserSchedulesService };
