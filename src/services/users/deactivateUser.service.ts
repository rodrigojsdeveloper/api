import { userRepository } from "../../repositories/user.repository";

const deactivateUserService = async (user_id: string): Promise<void> => {
  const user = await userRepository.findOneBy({ id: user_id });

  if (!user) {
    throw new Error("User not found");
  }

  user.is_active = false;

  await userRepository.save(user);
};

export { deactivateUserService };
