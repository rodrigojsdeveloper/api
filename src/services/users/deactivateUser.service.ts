import { userRepository } from "../../repositories/user.repository";

const deactivateUserService = async (user_id: string): Promise<void> => {
  const user = await userRepository.findOneBy({ id: user_id });

  if (!user) {
    throw new Error("User not found");
  }

  userRepository.delete(user.id);
};

export { deactivateUserService };
