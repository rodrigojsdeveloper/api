import { userRepository } from "../../repositories/user.repository";
import { Schedule } from "../../entities/schedule.entity";
import { NotFoundError } from "../../helpers";

const userSchedulesService = async (
  user_id: string
): Promise<Array<Schedule>> => {
  const user = await userRepository.findOne({
    where: { id: user_id },
    relations: ["schedules"],
  });

  if (!user) {
    throw new NotFoundError("User");
  }

  return user.schedules;
};

export { userSchedulesService };
