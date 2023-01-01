import { userRepository } from "../../repositories/user.repository";
import { ILogin } from "../../interfaces/login.interface";
import { UnauthorizedError } from "../../helpers";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";

const loginService = async (user: ILogin): Promise<{ token: string }> => {
  const findUser = await userRepository.findOneBy({ email: user.email });

  if (!findUser) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const passwordMatch = await compare(user.password, findUser.password);

  if (!passwordMatch) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const token = sign(
    { email: findUser.email },
    process.env.SECRET_KEY as string,
    { expiresIn: "24h", subject: findUser.id }
  );

  return { token };
};

export { loginService };
