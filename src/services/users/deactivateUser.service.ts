import { userRepository } from "../../repositories/user.repository";
import { NotFoundError } from "../../errors/notFound.error";

const deactivateUserService = async (user_id: string): Promise<void> => {
  const user = await userRepository.findOneBy({ id: user_id });

  if (!user) {
    throw new NotFoundError("User");
  }

  user.is_active = false;

  await userRepository.save(user);
};

export { deactivateUserService };
